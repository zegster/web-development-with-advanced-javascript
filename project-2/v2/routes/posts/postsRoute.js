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

/* (GET) [/posts/:postid] Returns a specific post by its ID number */
const getPostsId = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get specific post from posts collection by postid
    try {
        const jsonResult = await postsSchema.find({ id: req.params.postid });
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (POST) [/posts] Creates a new post for a specific user */
const setPosts = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Get specific user from users collection
    const { userid } = req.body;
    let user;
    try {
        user = await usersSchema.find({ id: userid });
    } catch (err) {
        mongoose.disconnect();
        console.log("Request Body: ", req.body);
        console.log(err);
        res.status(500);
        res.send(err);
    }

    //Check if user exists, return 404 if it is
    if (!user.length) {
        res.status(404);
        res.send("[posts]: User doesn't exist...");
    } else {
        //Create a new post in posts collection by userid
        try {
            const submission = { ...req.body, userid: user[0]._id };
            const post = new postsSchema(submission);
            await post.save();
            mongoose.disconnect();
            res.send(post);
        } catch (err) {
            mongoose.disconnect();
            console.log(err);
            res.status(500);
            res.send(err);
        }
    }
};

/* (PATCH) [/posts/:id] Updates a specific post */
const updatePosts = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Update a post in posts collection
    try {
        const post = await postsSchema.find({ id: req.params.id });
        post[0].set(req.body);
        const jsonResult = await post[0].save();
        mongoose.disconnect();
        res.send(jsonResult);
    } catch (err) {
        mongoose.disconnect();
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (DELETE) [/posts/:postid] Removes a particular post */
const deletePosts = async (req, res) => {
    //Connect to database
    mongoose.connect(mongoURL, mongooseOption);

    //Delete a post in posts collection
    try {
        const jsonResult = await postsSchema.deleteOne({ id: req.params.postid });
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
const postsRouter = express.Router();
postsRouter.get("/:postid", getPostsId);
postsRouter.post("/", bodyParser.json(), setPosts);
postsRouter.patch("/:id", bodyParser.json(), updatePosts);
postsRouter.delete("/:postid", deletePosts);

/* Export */
module.exports = postsRouter;
