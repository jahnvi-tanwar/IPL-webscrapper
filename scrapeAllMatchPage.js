const request = require("request")
const cheerio = require("cheerio")
const path = require("path")
const fs = require("fs")
const scrapeAllMatchPageObj = require("./scrapeParticularMatch")

const homePage = "https://www.espncricinfo.com"
const IPLfolderPath = path.join(__dirname,"allMatches")

function scrapeAllMatchPage(error, response,html){
    if(error){
        console.log(error)
    }else{
        let allLinks = getScoreCardLinks(html)

        if(fs.existsSync(IPLfolderPath) == true){
            fs.rmdirSync(IPLfolderPath,{recursive:true})
        }
        fs.mkdirSync(IPLfolderPath)

        for(let i = 0; i<allLinks.length; i++){
            request(allLinks[i],scrapeAllMatchPageObj.scrapeParticularMatch)
        }
    }
}

function getScoreCardLinks(html){
    let selTool = cheerio.load(html)
    let scorecard = selTool("a[data-hover='Scorecard']")
    let links = []
    for(let i = 0; i<scorecard.length; i++){
        let href = selTool(scorecard[i]).attr("href")
        links.push(homePage + href)
    }
    return links
}

module.exports = {
    scrapeAllMatchPage : scrapeAllMatchPage
}