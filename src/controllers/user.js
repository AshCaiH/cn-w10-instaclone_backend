import { Like, User } from "../models.js";
import { sendMessage, sendError } from "../functions/responses.js";
import sequelize from "../db/connection.js";

export const register = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        sendMessage(res, "Success", {user: user}, 201);
    } catch (error) {sendError(req, res, error);}
}


export const login = async (req, res) => {
    try {
        const user = {
            username: req.user.username,
            token: req.loginToken
        }

        sendMessage(res, "Success", {
            user: user
        }, 201);
    } catch (error) {sendError(req, res, error);}
}


export const list = async (req, res) => {
    try {
        sendMessage(res, "Success", {}, 201);
    } catch (error) {sendError(req, res, error);}
}


export const remove = async (req, res) => {
    try {
        sendMessage(res, "Success", {}, 201);
    } catch (error) {sendError(req, res, error);}
}

export const getLikes = async (req, res) => {
    try {

        const result = await sequelize.query(`SELECT DISTINCT * FROM Images JOIN Likes on Likes.ImageId=Images.id WHERE Likes.UserId = ${req.authorisation.id}`);
        console.log(result);
        sendMessage(res, "Success", {result: result[0]}, 201);
    } catch (error) {sendError(req, res, error);}
}