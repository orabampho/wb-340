/*
============================================
; Title: Exercise 1.3
; Author: Professor Krasso
; Date: 7 January 2022
; Modified By: Orawan Rabampho
; Code Attribution: Exercise 1.3 assignment instructions
;===========================================
*/

var url = require("url");
var parsedURL = url.parse("https://www.example.com/profile?name=smith");

    console.log(parsedURL.protocol);
    console.log(parsedURL.host);
    console.log(parsedURL.query);