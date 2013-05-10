#!/usr/bin/env node
"use strict"

/**
 * Module dependencies.
 */

var express = require('express'),
    path = require('path'),
    http = require('http')

var app = module.exports = express();


// Configuration
app.configure(function () {
    app.use(express.logger());
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, '/public')));
});


var staticExpiration = 1000;
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.configure('production', function () {
    staticExpiration = 86400000;
    app.use(express.errorHandler());
});

app.get("/", function (req, res) {
    //res.redirect("public/index.html");
    res.send('See this page: <a href="public/index.html">index.html</a>');
});


var port = 8011;
var hostname = '127.0.0.1';
app.listen(port);
console.log("Express server listening on http://%s:%d", hostname, port);

