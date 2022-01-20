const request = require("request")
const cheerio = require("cheerio")
const  scrapeAllMatchPageObj = require("./scrapeAllMatchPage")

const homePage = "https://www.espncricinfo.com"

function scrapeIPLpage(error, response, html){
    if(error){
        console.log(error)
    }else{
        let link = getMatchResultsLink(html)
        request(link,scrapeAllMatchPageObj.scrapeAllMatchPage)
    }
}

//extract link to the page having information of all matches
function getMatchResultsLink(html){
    let selTool = cheerio.load(html)
    let viewAllResults = selTool("a[data-hover='View All Results']").attr("href")
    return homePage + viewAllResults
}

module.exports = {
    scrapeIPLpage : scrapeIPLpage
}
