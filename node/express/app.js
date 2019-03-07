var express = require('express')
var app = express()
var logger = require('morgan')
var http = require('http')
var path = require('path')

app.use(logger("short"))
// 设置引擎
app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "ejs")

app.use(function(request, response) {  
  response.writeHead(200, { "Content-Type": "text/plain" });      
  response.end("Hello, World!");  
})

http.createServer(app).listen(3000)
