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
let EmployeeSchema = new Schema({
    firstName: { type: String, required: true},
    lastLast: { type: String, required: true}
});

//define the employee model
let Employee = mongoose.model("Employee", EmployeeSchema);

//expose the employee to calling files
module.exports = Employee;
