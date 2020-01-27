const appcontroller = require("./modules/isdocCreator/controllers/appController/appController");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const scheduler = require("node-schedule");


const app = express();

const run = scheduler.scheduleJob("*/5 * * * * *", function() {});
appcontroller();


module.exports = app;
