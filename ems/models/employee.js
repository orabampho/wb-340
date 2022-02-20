/*
=================================================
Title: employee.js
Author: Professor Krasso
Date 19 February 2022
Modified By: Orawan Rabampho
Description: Employee file.
=================================================
*/

//require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//employee schema
let employeeSchema = new Schema({
    firstName: { type: String, required: true},
    lastLast: { type: String, required: true}
});

//define the employee model
var Employee = mongoose.model("Employee", employeeSchema);

//expose the employee to calling files
module.exports = Employee;