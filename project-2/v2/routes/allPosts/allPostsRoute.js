/* Load 3rd Party Modules */
const express = require("express");
const mongoose = require("mongoose");

/* Load Components */
const postsSchema = require("../../db/schema/postsSchema");
const usersSchema = require("../../db/schema/usersSchema");

/* Mongo Database */
const mongoURL = "mongodb://127.0.0.1:27017/jsonplaceholder";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

/* (GET) [/allPosts] Returns all posts for all users */
const getAllPosts = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get posts collection
    try {
        const jsonResult = await postsSchema.find();
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (GET) [/allPosts/:username] Returns all posts for a specific user, by using their username */
const getAllPostsUser = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get specific user from users collection
    let user;
    try {
        user = await usersSchema.find({ username: req.params.username });
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }

    //Check if user is exists, return 404 if it is
    if (!user.length) {
        res.status(404);
        res.send("[allPosts]: User doesn't exist...");
    } else {
        // Get all posts from posts collection by username
        try {
            const jsonResult = await postsSchema.find({ userid: user[0]._id });
            mongoose.disconnect();
            res.send(jsonResult);
        } catch (err) {
            mongoose.disconnect();
            console.log(err);
            res.status(500);
            res.send(err);
        }
    }
};

/* Express Router */
const allPostsRouter = express.Router();
allPostsRouter.get("/", getAllPosts);
allPostsRouter.get("/:username", getAllPostsUser);

/* Export */
module.exports = allPostsRouter;
