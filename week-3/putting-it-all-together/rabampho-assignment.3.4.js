/*
============================================
Title: Assignment 3.4 - Putting it all together (header)
Author: Professor Krasso
Date: 21 January 2022
Modified By: Orawan Rabampho
Code Attribution: Assignment 3.4 instructions
Bootstrap: https://www.w3schools.com/whatis/tryit.asp?filename=trywhatis_bootstrap&stacked=h
===========================================
*/

//Load required libraries
var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");

//Load express app
var app = express();

//Tell Express the views are in the 'views' directory
app.set("views", path.resolve(__dirname, "views"));

//Tell Express to use the EJS view engine
app.set("view engine", "ejs");

//Use morgan logger
app.use(logger("short"));

//Request response function to render home page message
app.get("/", function(request, response) {
    response.render("index", {
        message: "home page"
    });
});

//Request response function to render about page message
app.get("/about", function(request, response) {
    response.render("about", {
        message: "about page"
    });
});

//Request response function to render contact page message
app.get("/contact", function(request, response) {
    response.render("contact", {
        message: "contact page"
    })
});

//Request response function to render products page message
app.get("/products", function(request, response) {
   response.render("products", {
       message: "products page"
   });
});

//Create server listening on 8080 port
http.createServer(app).listen(8080, function() {
   console.log("Application started on port 8080.");
});