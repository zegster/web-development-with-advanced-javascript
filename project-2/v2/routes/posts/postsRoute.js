/* Load 3rd Party Modules */
const express = require("express");

/* Load Components */
const bodyParser = require("../../lib/middleware/bodyParser");
const postsSchema = require("../../db/schema/postsSchema");
const usersSchema = require("../../db/schema/usersSchema");

/* (GET) [/posts/:postid] Returns a specific post by its ID number */
const getPostsId = async (req, res) => {
    //Get specific post from posts collection by postid
    try {
        const jsonResult = await postsSchema.find({ id: req.params.postid });
        res.send(jsonResult);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (POST) [/posts] Creates a new post for a specific user */
const setPosts = async (req, res) => {
    //Get specific user from users collection
    const { userid } = req.body;
    let user;
    try {
        user = await usersSchema.find({ id: userid });
    } catch (err) {
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
            res.send(post);
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err);
        }
    }
};

/* (PATCH) [/posts/:id] Updates a specific post */
const updatePosts = async (req, res) => {
    //Update a post in posts collection
    try {
        const post = await postsSchema.find({ id: req.params.id });
        post[0].set(req.body);
        const jsonResult = await post[0].save();
        res.send(jsonResult);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
};

/* (DELETE) [/posts/:postid] Removes a particular post */
const deletePosts = async (req, res) => {
    //Delete a post in posts collection
    try {
        const jsonResult = await postsSchema.deleteOne({ id: req.params.postid });
        res.send(jsonResult);
    } catch (err) {
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
