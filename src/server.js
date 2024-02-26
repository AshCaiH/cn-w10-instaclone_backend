require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5001;

// const User = require("./models/users/model");
// const userRouter = require("./models/users/routes");

app.use(express.json(), cors()); //userRouter);

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy"});
});

app.listen(port, async () => {
    // app.use(User)
    // await User.sync();

    console.log(`Server is listening on port ${port}`);
});