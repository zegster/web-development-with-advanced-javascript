/* Load 3rd Party Modules */
const express = require("express");
const mongoose = require("mongoose");

/* Load Components */
const bodyParser = require("../../lib/middleware/bodyParser");
const postsSchema = require("../../db/schema/postsSchema");
const usersSchema = require("../../db/schema/usersSchema");

/* Mongo Database */
const mongoURL = "mongodb://127.0.0.1:27017/jsonplaceholder";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

/* (GET) [/profile/:userid] Returns a specific user by userid */
const getUsers = async (req, res) => {
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
const setUsers = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Create a new user in users collection
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

/* (PATCH) [/profile] Update an existing user */
const updateUsers = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Update an user in users collection
    try {
        const { id } = req.body;
        const user = await usersSchema.find({ id: id });
        user[0].set(req.body);
        const jsonResult = await user[0].save();
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (DELETE) [/profile] Removes a particular user (will remove all posts associate to this user) */
const deleteUsers = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get specific user from users collection
    const { id } = req.body;
    let user;
    try {
        user = await usersSchema.find({ id: id });
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }

    //Check if user exists
    if (user.length) {
        //Delete all posts associate with this user in posts collection
        try {
            await postsSchema.deleteMany({ userid: user[0]._id });
        } catch (err) {
            mongoose.disconnect();
            console.log(err);
            res.status(500);
            res.send(err);
        }
    }

    //Delete an user in users collection
    try {
        const jsonResult = await usersSchema.deleteOne({ id: id });
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
profileRouter.get("/:userid", getUsers);
profileRouter.post("/", bodyParser.json(), setUsers);
profileRouter.patch("/", bodyParser.json(), updateUsers);
profileRouter.delete("/", bodyParser.json(), deleteUsers);

/* Export */
module.exports = profileRouter;
