/*
=================================================
Title: employee.js
Author: Professor Krasso
Date 19 February 2022
Modified By: Orawan Rabampho
Description: Employee database.
=================================================
*/
// required

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// define the employeeSchema

var employeeSchema = new Schema({
    firstName: { type: String, required: true, unique: true},
    lastName: { type: String, required: true, unique: true},

});

// define the employee model

var Employee = mongoose.model("Employee", employeeSchema);

// export the employee to calling files

module.exports = Employee;