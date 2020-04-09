/* Load 3rd Party Modules */
const express = require("express");
const axios = require("axios");

const getAllPosts = async (req, res) => {
    let baseUrl = `https://jsonplaceholder.typicode.com/posts`;
    let jsonResult = [];

    try {
        const res = await axios.get(baseUrl);
        jsonResult.push(res.data);
    } catch (err) {
        console.log(err);
    }

    res.send(jsonResult);
};

const getAllPostsUser = async (req, res) => {
    let username = req.params.username;
    let baseUrl = `https://jsonplaceholder.typicode.com/posts/${username}`;
    let jsonResult = [];

    try {
        const res = await axios.get(baseUrl);
        jsonResult.push(res.data);
    } catch (err) {
        console.log(err);
    }

    res.send(jsonResult);
};

/* Express Router */
const allPostsRouter = express.Router();
allPostsRouter.get("/", getAllPosts);
allPostsRouter.get("/:username", getAllPostsUser);

/* Export */
module.exports = allPostsRouter;
