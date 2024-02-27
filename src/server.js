require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const { User, Image } = require("./models");
const router = require("./routes");

const models = [User, Image];

const port = process.env.PORT || 5001;

app.use(express.json(), cors(), router);

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy"});
});

app.listen(port, async () => {
    models.map((model) => app.use(model));
    
    User.hasMany(Image);
    Image.belongsToMany(User, {through: "Likes"});
    
    models.map(async (model) => model.sync());

    console.log(`Server is listening on port ${port}`);
});