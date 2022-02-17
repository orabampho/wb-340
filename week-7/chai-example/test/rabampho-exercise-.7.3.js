/*
============================================
Title:  rabampho-exercise.7.3.js
Author: Orawan Rabampho
Date:   20 February 2022
Description: Function used in a Mocha and 
Chai test.
;===========================================
*/

var fruits = require("../rabampho-fruits");

const chai = require("chai");
const assert = chai.assert;

describe("fruits", function() {
    it("should return an array of fruits", function() {
      const f = fruits("Apple,Orange,Mango");
      assert(Array.isArray(f));
    });
  });