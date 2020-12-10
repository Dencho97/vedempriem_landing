/* eslint-disable */
const express = require("express");
const path = require("path");
const webpack = require('webpack');

const app = express();
const port = 1337;

// static assets
app.use("/dist", express.static("dist"));
app.use("/dist/assets", express.static("dist/assets"));

// headers for api
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// main route
app.get("*", function(req, res){
	res.sendFile(path.join(__dirname, 'schedule.html'));
});

// app start up
app.listen(port, (err) => {
    if(err)
        throw err;
    console.log("server started: http://localhost:"+port);
});