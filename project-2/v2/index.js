/* Load 3rd Party Modules */
const express = require("express");

/* Load Components */
const logger = require("./lib/middleware/logger");
const allPostsRouter = require("./routes/allPosts/allPostsRoute");
const postsRouter = require("./routes/posts/postsRoute");
const profileRouter = require("./routes/profile/profileRoute");

/* Configure Server */
const app = express();
app.use(logger);
app.use("/allPosts", allPostsRouter);
app.use("/posts", postsRouter);
app.use("/profile", profileRouter);

/* Starting Server */
const port = 5000;
app.listen(port, () => console.log(`Now listening on port ${port}`));
