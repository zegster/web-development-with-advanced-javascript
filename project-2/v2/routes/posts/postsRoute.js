/* Load 3rd Party Modules */
const express = require("express");
const axios = require("axios");

const getPostsId = async (req, res) => {
    let postid = req.params.postid;
    let baseUrl = `https://jsonplaceholder.typicode.com/posts/${postid}`;
    let jsonResult = [];

    try {
        const res = await axios.get(baseUrl);
        jsonResult.push(res.data);
    } catch (err) {
        console.log(err);
    }

    res.send(jsonResult.flat());
};

const setPosts = (req, res) => {
    res.send(req.body);
};

const updatePosts = (req, res) => {
    let id = req.params.id;
    res.send(req.body);
};

const deletePosts = (req, res) => {
    let postid = req.params.postid;
    res.send(req.body);
};

/* Express Router */
const postsRouter = express.Router();
postsRouter.get("/:postid", getPostsId);
postsRouter.post("/", setPosts);
postsRouter.patch("/:id", updatePosts);
postsRouter.delete("/:postid", deletePosts);

/* Export */
module.exports = postsRouter;
