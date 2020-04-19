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
        const postid = req.params.postid;
        const jsonResult = await postsSchema.find({ id: postid });
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
        //Creates a new post in posts collection by userid
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

const updatePosts = async (req, res) => {
    let id = req.params.id;
    res.send(req.body);
};

const deletePosts = async (req, res) => {
    let postid = req.params.postid;
    res.send(req.body);
};

/* Express Router */
const postsRouter = express.Router();
postsRouter.get("/:postid", getPostsId);
postsRouter.post("/", bodyParser.json(), setPosts);
postsRouter.patch("/:id", updatePosts);
postsRouter.delete("/:postid", deletePosts);

/* Export */
module.exports = postsRouter;
