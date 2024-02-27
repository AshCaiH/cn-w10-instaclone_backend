const { User } = require("../models");
const { sendMessage, sendError } = require("../common/responses")

module.exports.
register = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        sendMessage(res, "Success", {user: user}, 201);
    } catch (error) {sendError(req, res, error);}
}


module.exports.
login = async (req, res) => {
    try {
        sendMessage(res, "Success", {token: req.loginToken}, 201);
    } catch (error) {sendError(req, res, error);}
}


module.exports.
list = async (req, res) => {
    try {
        sendMessage(res, "Success", {}, 201);
    } catch (error) {sendError(req, res, error);}
}


module.exports.
delete = async (req, res) => {
    try {
        sendMessage(res, "Success", {}, 201);
    } catch (error) {sendError(req, res, error);}
}