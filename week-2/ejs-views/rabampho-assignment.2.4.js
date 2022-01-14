/*
============================================
; Title: Assignment 2.3 - EJS Views
; Author: Professor Krasso
; Date: 14 January 2022
; Modified By: Orawan Rabampho
; Code Attribution: Assignment 2.3 instructions
;===========================================
*/

var http = require("http");
var express = require("express");
var path = require("path");
var app = express();

//Tell Express to views in the 'views' directory
app.set("views",path.resolve(__dirname, "views"));

//Tell Express to use the EJS view engine
app.set("view engine", "ejs");
app.get("/", function(request, response){
    response.render("index",{
        firstName:"Orawn",
        lastName:"Rabampho",
        address:"405 Wallace Rd",
    });
});

http.createServer(app).listen(8080, function(){
    console.log("EJS-Views app started on port 8080.");
});

