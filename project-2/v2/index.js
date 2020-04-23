/* Load 3rd Party Modules */
const express = require("express");
const mongoose = require("mongoose");

/* Load Components */
const logger = require("./lib/middleware/logger");
const allPostsRouter = require("./routes/allPosts/allPostsRoute");
const postsRouter = require("./routes/posts/postsRoute");
const profileRouter = require("./routes/profile/profileRoute");

/* Configure Mongo Database */
const mongoURL = "mongodb://127.0.0.1:27017/jsonplaceholder";
const mongooseOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
mongoose.connect(mongoURL, mongooseOption);

/* Configure Server */
const app = express();
app.use(logger);
app.use("/allPosts", allPostsRouter);
app.use("/posts", postsRouter);
app.use("/profile", profileRouter);

/* Starting Server */
const port = 5000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
