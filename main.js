const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
const path = require("path")
const scrapeIPLpageObj = require("./scrapeIPLpage")

const url = "https://www.espncricinfo.com/series/ipl-2021-1249214"

request(url,scrapeIPLpageObj.scrapeIPLpage)

