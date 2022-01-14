/*
============================================
; Title: Exercise 2.2
; Author: Professor Krasso
; Date: 14 January 2022
; Modified By: Orawan Rabampho
; Code Attribution: Exercise 2.2 assignment instructions
;===========================================
*/

var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response) {

   console.log("In comes a request to: " + request.url);

   response.end("Hello World\n");

})

http.createServer(app).listen(8080, function()
{
    console.log("Application started on port %s", 8080);
}
);