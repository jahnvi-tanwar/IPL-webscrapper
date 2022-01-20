let fs = require("fs")
let path = require("path")

fs.mkdirSync("hello Fox")

fs.writeFileSync(path.join("hello Fox","hello me"),"hello")