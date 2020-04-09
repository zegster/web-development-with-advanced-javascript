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

const getUser = async (req, res) => {
    let userid = req.params.userid;
    let baseUrl = `https://jsonplaceholder.typicode.com/users?id=${userid}`;
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
const router = express.Router();
router.get("/allPosts", getAllPosts);
router.get("/allPosts/:username", getAllPostsUser);
router.get("/posts/:postid", getPostsId);
router.get("/profile/:userid", getUser);

/* Configure Server */
const app = express();
app.use(router);

/* Starting Server */
const port = 5000;
app.listen(port);
console.log("Now listening on port " + port);
