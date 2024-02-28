import { User } from "../models.js";
import { sendMessage, sendError } from "../common/responses.js";

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
        sendMessage(res, "Success", {token: req.loginToken}, 201);
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