const bcrypt = require("bcrypt");

const { sendMessage, sendError } = require("../common/responses")
const { User } = require("../models");


module.exports.
findUser = async (req, res, next) => {
    try {        
        req.user = await User.findOne({where: {username: req.body.username}});

        next();
    } catch (error) {sendError(res, error);}
}


module.exports.
hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));

        next();
    } catch (error) {sendError(res, error);}
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
    } catch (error) {sendError(res, error);}
}