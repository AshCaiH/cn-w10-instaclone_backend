const { Image } = require("../models");
const { Like } = require("../models");
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


        const likeOptions = { ImageId: image.id, UserId: req.authorisation.id}

        let like = await Like.findOne({where: likeOptions});

        // Add to the likes list if it hasn't been already.
        if (!like) {
            like = await Like.create(likeOptions);
            sendMessage(res, "You liked the image", {image, like}, 201);
        } else {
            sendMessage(res, "You already liked the image", {image, like}, 201);
        }

    } catch (error) {sendError(req, res, error);}
}
