/* Load 3rd Party Modules */
const express = require("express");

/* Load Components */
const postsSchema = require("../../db/schema/postsSchema");
const usersSchema = require("../../db/schema/usersSchema");

/* (GET) [/allPosts] Returns all posts for all users */
const getAllPosts = async (req, res) => {
    //Get posts collection
    try {
        const jsonResult = await postsSchema.find();
        res.send(jsonResult);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (GET) [/allPosts/:username] Returns all posts for a specific user, by using their username */
const getAllPostsUser = async (req, res) => {
    //Get specific user from users collection
    let user;
    try {
        user = await usersSchema.find({ username: req.params.username });
    } catch (err) {
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
            res.send(jsonResult);
        } catch (err) {
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
