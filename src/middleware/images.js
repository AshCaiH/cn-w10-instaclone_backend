const { sendMessage, sendError } = require("../common/responses")
const { Image } = require("../models");

module.exports.
setGet = async (req, res, next) => {
    try {
        const image = Image.findOne({where: { id: req.body.id}})

        if (!image) {
            // Create new entry in Image table and assign it to image variable.
        }
        
        next();
    } catch (error) {sendError(req, res, error);}
}