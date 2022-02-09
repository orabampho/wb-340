/*
=====================================================
Title: Exercise 6.3 - Mongoose
Author: Professor Krasso
Date 09 February 2022
Modified By: Orawan Rabampho
Description: Create Mongoose connection.
=====================================================
*/

//import required libraries
var express = require("express");
var http = require("http");
var logger = require("morgan");
var mongoose = require("mongoose");

//create app statements
var mongoDB = "mongodb+srv://admin:Y3ll0wLigh1@buwebdev-cluster-1.s8vxs.mongodb.net/test";
mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error:"));
db.once("open", function(){
    console.log("Application connected to mLab MongoDB instance");
});

var app = express();
app.use(logger("dev"));

http.createServer(app).listen(8080, function(){
    console.log("Application started and listening in port 8080");
})