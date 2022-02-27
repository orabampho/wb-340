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
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose"); 
var helmet = require("helmet");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var Employee = require("./models/employee"); // Import employee library

//mLab connection
var mongoDB = "mongodb+srv://admin:EmP10y33@buwebdev-cluster-1.ogmhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//mongoose connection to MongoDB
mongoose.connect(mongoDB);

//mongoose promise
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error."));
db.once("open", function(){
    console.log("Application connected to MongoDB Atlas Cluster");
});

/* Security - setup csrf protection */
var csrfProtection = csrf({cookie: true});

// app functions
var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//morgan logger
app.use(logger("short"));
//body parser
//cookie parser
app.use(cookieParser());
//helmet
app.use(helmet.xssFilter());
//csrf protection
app.use(csrfProtection);
app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(function(request, response, next) { 
    var token = request.csrfToken();
    response.cookie('XSRF-TOKEN', token);
    response.locals.csrfToken = token;
    next();
});

/**
 * Sets up the view engine, view's directory path, and the server port.
 */

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

/**
 * Description: Processes a form submission.
 * Type: HttpPost
 * Request: textName
 * Response: index.ejs
 * URL: localhost:8080/process
 */
app.post("/process", function(request, response){
    if (!req.body.txtFirstName || !req.body.txtLastName) {
        response.status(400).send("Entries must have a name");
        return;
    }

    var firstName = request.body.firstName;
    var lastName = request.body.lastName;

    var employee = new Employee({
        firstName: firstName,
        lastName: lastName
    });    

    //save
    employee.save(function (error){
        if (error) throw error;
        console.log(firstName + " " + lastName + "your entry is saved!")
    });

    response.redirect("/");
});

//Employee listing page.
app.get("/list", function(request, response){
    Employee.find({}, function(error, employees) {
    if (error) {
        console.log(error)
        throw error;
    } else {
        console.log(employees);
        response.render("list", {
        title: "Employee List",
        employees: employees
        });
        } 
    }); 
});

//View query 
app.get("/view/:queryName", function(request,response){
    var queryName = request.params['queryName'];
    Employee.find({'firstName':queryName}, function(error, employees) {
    
    if (error) throw error;
    console.log(employees);
    
    if(employees.length> 0){
    response.render("view", {
    
    title: "Employee Record",
    employee: employees
      });
    }
    else {
    response.redirect("/list") 
        }  
      });
    });
    
    //Modify applications port
    app.set("port", process.env.PORT || 8080);
    


http.createServer(app).listen(8080, function(){
    console.log("Application started on port 8080!");
});
