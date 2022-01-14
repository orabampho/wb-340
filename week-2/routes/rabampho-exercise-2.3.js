/*
============================================
; Title: Exercise 2.3
; Author: Professor Krasso
; Date: 14 January 2022
; Modified By: Orawan Rabampho
; Code Attribution: Exercise 2.3 assignment instructions
;===========================================
*/

var express = require("express");
var http = require("http");

var app = express();

//routes ("/" root route, \n is new line)
app.get("/", function(request, response) {
    response.end("Welcome to the homepage!\n");
});
app.get("/about", function(request, response) {
    response.end("Welcome to the about page!");
});
app.get("/contact", function(request, response) {
    response.end("Welcome to the contact page!");
});
app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!\n");
});

//node server to listen on port 8080
http.createServer(app).listen(8080, function(){
    console.log("Application started on port %s", 8080);
});