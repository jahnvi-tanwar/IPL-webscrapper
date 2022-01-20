const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const excelFunctionsObj = require("./excelFunctions")

const homePage = "https://www.espncricinfo.com"
const IPLfolderPath = path.join(__dirname,"allMatches")

function scrapeParticularMatch(error, response, html){
    if(error){
        console.log(error)
    }else{

        extractBatsmanInformation(html)
    }
}

function extractBatsmanInformation(html){

    //Venue date opponent result runs balls four sixer sr
    // ipl
    //      team
    //          player
    //              Venue date opponent result runs balls four sixes sr
    // venue date result -> common

    let selTool = cheerio.load(html)
    let description = selTool(".match-header-container .description").text().split(", ")
    let result = selTool(".match-header-container .status-text").text()

    let venue = description[1]
    let date = description[2]

    let innings = selTool(".card.content-block.match-scorecard-table>.Collapsible")
    // console.log(innings.length)
    let teams = []

    for(let i = 0; i<innings.length; i++){
        let heading = selTool(innings[i]).find("h5").text()
        let teamName = heading.split("INNINGS")[0].trim()
        teams.push(teamName)
        let folderPath = path.join(IPLfolderPath,teamName)
        makeDir(folderPath)
    }

    for(let i = 0; i<innings.length; i++){

        let teamName = teams[i]
        let opponent = teams[(i+1)%2]

        let table = selTool(innings[i]).find(".batsman tbody")
        let rows = selTool(table).find("tr")
        for(let i = 0; i<rows.length; i++){
            let cols = selTool(rows[i]).find("td")

            if(cols.length == 8){

                let playerName = selTool(cols[0]).text().trim()
                let runs = selTool(cols[2]).text()
                let balls = selTool(cols[3]).text()
                let fours = selTool(cols[5]).text()
                let sixes = selTool(cols[6]).text()
                let sr = selTool(cols[7]).text()

                console.log(teamName)
                console.log(playerName)
                console.log(venue,date,opponent,result,runs,balls,fours,sixes,sr)
                console.log("")

                fillExcelFile(teamName,playerName,venue,date,opponent,result,runs,balls,fours,sixes,sr)
                
            }
            
        } 
    }

}

function fillExcelFile(teamName,playerName,venue,date,opponent,result,runs,balls,fours,sixes,sr)
{
    let filePath = path.join(IPLfolderPath,teamName,playerName+".xlsx")

    let content = []
    if(fs.existsSync(filePath)==true){
       content = excelFunctionsObj.excelReader(filePath)
    }

    let playerObj = {
        venue,
        date,
        opponent,
        result,
        runs,
        balls,
        fours,
        sixes,
        sr
    }
    content.push(playerObj)

    excelFunctionsObj.excelWriter(filePath,content)
}


function makeDir(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath)
    }
}

module.exports = {
    scrapeParticularMatch : scrapeParticularMatch
}