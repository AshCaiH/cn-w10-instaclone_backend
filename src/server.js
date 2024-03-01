import "dotenv/config.js";

import express, { json } from "express";
import cors from "cors";
const app = express();

import { User, Image, Like } from "./models.js";
import router from "./routes.js";

const models = [User, Like, Image];

const port = process.env.PORT || 5001;

const corsOptions = {
    AccessControlAllowOrigin: '*',
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

app.use(json(), cors(corsOptions), router);

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy"});
});

app.listen(port, async () => {
    models.map((model) => app.use(model));
    
    User.hasMany(Like);
    Image.hasMany(Like);
    
    models.map(async (model) => model.sync());

    console.log(`Server is listening on port ${port}`);
});