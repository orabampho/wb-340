/*
============================================
; Title: Exercise 1.3
; Author: Professor Krasso
; Date: 7 January 2022
; Modified By: Orawan Rabampho
; Code Attribution: Exercise 1.5 assignment instructions
;===========================================
*/

var http = require("http");
function processRequest(req, res) {
    var body = "Dreaming involves risk, so you need to be courageous as you venture into the unknown.";
        var contentLength = body.length;
        res.writeHead(200, {
            'Content-Length': contentLength,
            'Content-Type': 'text/plain'
        });

        res.end(body);
}

var s = http.createServer(processRequest);
s.listen(8080);