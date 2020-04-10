/* Load 3rd Party Modules */
const express = require("express");
const bodyParser = require("body-parser");

/* Configure Parser */
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = { jsonParser, urlencodedParser };
