/*
=====================================================
Title: Exercise 5.2 - EJS Templates
Author: Professor Krasso
Date 01 February 2022
Modified By: Orawan Rabampho
Description: Create EJS Templates.
=====================================================
*/

//require
var express = require("express");
var http = require("http");
var path = require("path");

var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var animals = [
    "Fish",
    "Dog",
    "Cat",
    "Bird"
];

app.get("/", function(request, response){
    response.render("index",{
        animals: animals
    });
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});