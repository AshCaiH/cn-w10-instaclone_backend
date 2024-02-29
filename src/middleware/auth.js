import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendMessage, sendError } from "../functions/responses.js"
import { User } from "../models.js";


export const findUser = async (req, res, next) => {
    try {        
        req.user = await User.findOne({where: {username: req.body.username}});

        if (!req.user) sendMessage(res, "", {error: "User does not exist"}, 401);
        else next();
    } catch (error) {sendError(req, res, error);}
}


export const generateToken = async (req, res, next) => {
    try {
        const token = jwt.sign({
            id: req.user.id,
            username: req.user.username,
        }, process.env.JWT_SECRET);

        req.loginToken = token;

        next();
    } catch (error) {sendError(req, res, error);}
}


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({where: {id: decodedToken.id }});
        req.authorisation = user;

        if (!user) {
            sendMessage(res, "User not authorised", {error: "User not authorised"}, 401);
        } else next();

    } catch (error) {sendError(req, res, error);}
}


export const hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));

        next();
    } catch (error) {sendError(req, res, error);}
}


export const checkPassword = async (req, res, next) => {
    try {        
        if (await bcrypt.compare(req.body.password, req.user.password)) {
            delete req.user.password;
            next();
        } else {
            sendMessage(res, "", {error: "Password incorrect"}, 401);
        }
    } catch (error) {sendError(req, res, error);}
}
