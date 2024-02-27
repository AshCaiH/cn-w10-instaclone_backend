const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sendMessage, sendError } = require("../common/responses")
const { User } = require("../models");


module.exports.
findUser = async (req, res, next) => {
    try {        
        req.user = await User.findOne({where: {username: req.body.username}});

        next();
    } catch (error) {sendError(req, res, error);}
}


module.exports.
generateToken = async (req, res, next) => {
    try {
        const token = jwt.sign({
            id: req.user.id,
            username: req.user.username,
        }, process.env.JWT_SECRET);

        req.loginToken = token;

        next();
    } catch (error) {sendError(req, res, error);}
}


module.exports.
verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({where: {id: decodedToken.id }});
        req.authorisation = user;

        if (!user) {
            sendMessage(res, "User not authorised", {}, 401);
        } else next();

    } catch (error) {sendError(req, res, error);}
}


module.exports.
hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));

        next();
    } catch (error) {sendError(req, res, error);}
}


module.exports.
checkPassword = async (req, res, next) => {
    try {        
        if (await bcrypt.compare(req.body.password, req.user.password)) {
            delete req.user.password;
            next();
        } else {
            sendMessage(res, "Incorrect password", 201);
        }
    } catch (error) {sendError(req, res, error);}
}