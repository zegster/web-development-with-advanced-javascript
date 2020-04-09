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

    res.send(jsonResult);
};

/* Express Router */
const postsRouter = express.Router();
postsRouter.get("/:postid", getPostsId);

/* Export */
module.exports = postsRouter;
