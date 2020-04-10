/* Load 3rd Party Modules */
const express = require("express");
const axios = require("axios");

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

    res.send(jsonResult.flat());
};

/* Express Router */
const profileRouter = express.Router();
profileRouter.get("/:userid", getUser);

/* Export */
module.exports = profileRouter;
