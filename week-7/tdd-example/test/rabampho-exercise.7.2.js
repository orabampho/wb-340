/*
============================================
Title:  rabampho-exercise.7.2.js
Author: Orawan Rabampho
Date:   20 February 2022
Description: Function used in a mocha test.===========================================
*/

var assert = require("assert");
describe("String#split", function() {
    it("should return an array of fruits", function() {
        assert(Array.isArray('Apple,Orange,Mango'.split(',')));
    });
});

