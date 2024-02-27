const { Image } = require("../models");
const { User } = require("../models");
const { sendMessage, sendError } = require("../common/responses")

module.exports.
like = async (req, res, next) => {
    try {
        let image = await Image.findOne({where: { id: req.body.id}})

        if (!image) {
            console.log("ding");
            // Create new entry in Image table and assign it to image variable.
            image = await Image.create({
                id: req.body.id,
                urlSmall: req.body.urlSmall,
                urlRegular: req.body.urlRegular,
                photographer: req.body.photographer,
            })
        }

        User.update( {UserId: req.authorisation.id}, {where: {id: req.body.id}});

        sendMessage(res, "You liked the image", {image}, 201);
    } catch (error) {sendError(req, res, error);}
}
