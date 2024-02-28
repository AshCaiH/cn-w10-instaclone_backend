import { Image } from "../models.js";
import { Like } from "../models.js";
import { sendMessage, sendError } from "../functions/responses.js"

export const like = async (req, res, next) => {
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

export const unlike = async (req, res, next) => {
    try {
        console.log("hello");
        const unlikeOptions = { ImageId: req.body.id, UserId: req.authorisation.id}
        const unlike = await Like.destroy({where: unlikeOptions});

        sendMessage(res, "Removed like", {unlike}, 201);
    } catch (error) {sendError(req, res, error);}
}
