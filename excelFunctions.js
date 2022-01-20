const fs = require("fs");
const xlsx = require("xlsx")

function excelWriter(filePath, jsonObj){
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(jsonObj)
    xlsx.utils.book_append_sheet(newWB,newWS,"sheet-1")
    // console.log(filePath)
    xlsx.writeFile(newWB,filePath)
}

function excelReader(filePath){
    let wb = xlsx.readFile(filePath)
    let excelData = wb.Sheets["sheet-1"]
    let jsonObj = xlsx.utils.sheet_to_json(excelData)
    return jsonObj
}

module.exports = {
    excelReader : excelReader,
    excelWriter : excelWriter
}