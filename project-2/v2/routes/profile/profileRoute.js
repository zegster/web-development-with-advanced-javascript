/* Load 3rd Party Modules */
const express = require("express");
const mongoose = require("mongoose");

/* Load Components */
const bodyParser = require("../../lib/middleware/bodyParser");
const usersSchema = require("../../db/schema/usersSchema");

/* Mongo Database */
const mongoURL = "mongodb://127.0.0.1:27017/jsonplaceholder";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

/* (GET) [/profile/:userid] Returns a specific user by userid */
const getUser = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get a specific user by userid
    try {
        const userid = req.params.userid;
        const jsonResult = await usersSchema.find({ id: userid });
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (POST) [/profile] Creates a new user */
const setUser = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Creates a new user in users collection
    try {
        const user = new usersSchema(req.body);
        const jsonResult = await user.save();
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* Express Router */
const profileRouter = express.Router();
profileRouter.get("/:userid", getUser);
profileRouter.post("/", bodyParser.json(), setUser);

/* Export */
module.exports = profileRouter;
