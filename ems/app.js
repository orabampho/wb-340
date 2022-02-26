/*
=================================================
Title: Assignment EMS 
Author: Professor Krasso
Date 19 February 2022
Modified By: Orawan Rabampho
Description: EMS
=================================================
*/

var express = require("express");
var http = require("http");
var logger = require("morgan");
var helmet = require("helmet");
var path = require("path");

//required for mongoose
var mongoose = require("mongoose");
var Employee = require("./models/employee");

//mLab connection
var mongoDB = "mongodb+srv://admin:EmP10y33@buwebdev-cluster-1.ogmhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//mongoose connection to MongoDB
mongoose.connect(mongoDB, {

});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error."));
db.once("open", function(){
    console.log("Application connected to MongoDB Atlas Cluster");
});

var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));
app.use(helmet.xssFilter());

app.get("/", function(request, response){
    response.render("index",{
        title: "Home page",
        message: "XSS Prevention Example"
    });
});

app.get("/list", function(request, response){
    response.render("list", {
        title: "Tabular view of employee records",
    });
});

app.get("/new", function(request, response){
    response.render("new", {
        title: "Data entry page",
    });
});

app.get("/view", function (request, response){
    response.render("view", {
        title: "View selected employee details",
    });
});


http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});
