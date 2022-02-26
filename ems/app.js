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
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");


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

/* Security - setup csrf protection */
var csrfProtection = csrf({cookie: true});


var app = express();

//morgan logger
app.use(logger("short"));
//body parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

//cookie parser
app.use(cookieParser());
//helmet
app.use(helmet.xssFilter());
//csrf protection
app.use(csrfProtection);

/** 
 * intercepts all incoming requests and adds a csrf token to the response.
*/
app.use(function(req, res, next){
    var token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token);
    res.locals.csrfToken = token;
    next();
});

/**
 * Sets up the view engine, view's directory path, and the server port.
 */

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(request, response){
    response.render("index",{
        title: "Home page",
        message: "XSS Prevention Example"
    });
});

app.get("/new", function(request, response){
    response.render("new", {
        title: "New Entry Page",
        message: "New Entry",
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

/**
 * Description: Processes a form submission.
 * Type: HttpPost
 * Request: textName
 * Response: index.ejs
 * URL: localhost:8080/process
 */
app.post("/process", function(request, response){
    //console.log(request.body.txtName);
    console.log(request.body.txtName);
    
    if (!request.body.firstName) {
    res.status(400).send("You must enter a first name.");
    return;
    }

    if (!request.body.lastName){
        response.status(400).send("You must enter a last name.");
        return;
    }

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;

    //create a employee model 
    var employee = new Employee({
        firstName: firstName,
        lastName: lastName
    });

    //save
    employee.save(function (error){
        if (error) throw error;
        console.log(firstName + lastName + "your entry is saved!")
    });

    response.redirect("/");
});

//Employee listing page.
app.get("/list", function(request, response){
    Employee.find ({}, function(error, employee) {
    if (error) throw error;
    response.render("list", {
    title: "Employee List",
    employee: employee
        });
    }); 
});



http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});
