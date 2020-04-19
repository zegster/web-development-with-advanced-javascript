/* Load 3rd Party Modules */
const mongoose = require("mongoose");

const postsSchema = mongoose.model("posts", {
    userid: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
});

module.exports = postsSchema;
