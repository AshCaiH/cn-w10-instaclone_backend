import { Router } from "express";
const router = Router();

import * as common from "./functions/common.js";
import * as unsplash from "./functions/unsplash.js";

import * as image from "./controllers/image.js";
import * as user from "./controllers/user.js";

import * as auth from "./middleware/auth.js";

// User routes
router.post("/user/login", auth.findUser, auth.checkPassword, auth.generateToken, user.login);
router.post("/user/register", auth.hashPassword, user.register);

router.get("/user/likes", common.basic); // Show list of user's likes.

router.put("/user/update", common.basic); // Update email, password, etc.

router.delete("/user/delete", common.basic);


// Image routes
router.post("/image/like", auth.verifyToken, image.like); // Add to table if item doesn't exist, and to user's likes.
router.post("/image/liked", auth.verifyToken, image.checkLiked); // Check if user has liked this image.

router.get("/image/likes", common.basic); // Get list of most liked images.

router.delete("/image/unlike", auth.verifyToken, image.unlike); // Remove from user's likes, and remove from table if not liked by any user.


// Other routes
router.get("/unsplash/getlist/:pageNo", unsplash.getImages); // Grab images from unsplash.
router.get("/unsplash/getrandom", unsplash.getRandomImage); // Grab a random image from unsplash.

export default router;
