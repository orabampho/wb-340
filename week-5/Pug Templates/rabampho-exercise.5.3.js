/*
=====================================================
Title: Exercise 5.3 - Pug Templates
Author: Professor Krasso
Date 01 February 2022
Modified By: Orawan Rabampho
Description: Create Pug Templates.
=====================================================
*/

var express = require("express");
var http = require("http");
var pug = require("pug");
var path = require("path");

var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", function(request, response){
    response.render("index", {
        message: "A perfect day would be to get into the car, drive out to Yosemite and go camping."
    });
});

http.createServer(app).listen(3000, function(){
    console.log("Application started on port 3000!");
});