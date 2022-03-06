/*
=================================================
Title: view.ejs
Author: Professor Krasso
Date 19 February 2022
Modified By: Orawan Rabampho
Description: Employee information view page.
=================================================
*/

// requirement statements 
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var helmet = require("helmet");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Employee = require("./models/employee");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

// link to mongoDB 
var mongoDB = "mongodb+srv://admin:EmP10y33@buwebdev-cluster-1.ogmhj.mongodb.net/ems?retryWrites=true&w=majority";

// Mongoose connection. 
mongoose.connect(mongoDB, {
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error: "));

db.once("open", function() {
    console.log("Application connected to MongoDB Atlas Cluster");
});

//set the Variable for Express and CSRF. 
var app = express();
var csrfProtection = csrf({cookie: true});


//set the view and view engine.
app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');

//set to port 8080. 
app.set("port", process.env.PORT || 8080)

//set the logger and app.use
app.use(logger('short'));

app.use(helmet.xssFilter());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(csrfProtection);


app.use(function(request, response, next) {
    var token = request.csrfToken();
    response.cookie('XSRF-TOKEN', token);
    response.locals.csrfToken = token;
    next();
});


//routing statements

// home page. 
app.get('/', function(request, response){
    response.render('index',{
        message: "XSS Prevention Example",
        title: "Home"
    });
}); 


// new employee page 
app.get('/new', function(request, response){
    response.render('new',{
        title: "New",
        message: "Enter First and Last Name."
    });
}); 

// first and last name forms with error message 
app.post("/process", function(request, response) {
    console.log(request.body);
    if (!request.body.firstName) {
        response.status(400).send("You must enter a first name.");
        return; 
    }

    if (!request.body.lastName) {
        response.status(400).send("You must enter a last name.");
        return; 
    }

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;

    var employee = new Employee({
        firstName: firstName,
        lastName: lastName
    });
  

    employee.save(function (error) {
        if (error) throw error;
        console.log(firstName + lastName + " your entry is saved!")
    });
    response.redirect("/");

});

// employee listing page 
app.get("/list", function(request, response) {
    Employee.find({}, function(error, employees) {
        if (error) throw error;
        response.render("list", {
            title: "Employee List",
            employees: employees
        });
    });
});

//get view.ejs for employee query
app.get("/view/:queryName", function(request, response){
    var queryName = request.params.queryName;

    Employee.find({'firstName': queryName}, function(error, employee){
        if(error) throw error;
        if(employee.length>0){
            response.render("view",{
                employee: employee
            })
        }
        else {
            response.redirect('/list');
        }
    });
});


//create server and listen on port 8080
http.createServer(app).listen(app.get("port"), function() {
    console.log('Application started and listening on port %s', + app.get("port"))
});