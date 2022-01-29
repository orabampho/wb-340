/*
=====================================================
; Title: Assignment 4.2 Json API
; Author: Professor Krasso
; Date 29 January 2022
; Modified By: Orawan Rabampho
; Description: JSON API's.
=====================================================
*/

var express = require("express");
var http = require("http");
var app = express();
app.get("/customer/:id", function(request, response){
    var id = parseInt(request.params.id, 10);
    response.json({
        firstName: "Leo",
        lastName: "Tolstoy",
        employeeId: id
    });
});

http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080");
});