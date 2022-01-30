/*
=====================================================
; Title: Exercise 4.3 - HTTP Status Codes
; Author: Professor Krasso
; Date 29 January 2022
; Modified By: Orawan Rabampho
; Description: HTTP Status Codes.
=====================================================
*/

var express = require("express");
var http = require("http");
var logger = require(morgan);

//require codes
var app = express();
app.get("/not-found", function(request, response){
    response.status(404);
    response.json({
        error: "Resource not found."
    })
});
app.get("/ok", function(request, response){
    response.status(200);
    response.json({
        message: "Page loaded correctly."
    })
});
app.get("/not-implemented", function(request, response){
    response.status(501);
    response.json({
        error: "Page not implemented."
    })
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});