const { Router } = require("express");
const router = Router();

const common = require("./controllers/common");
const image = require("./controllers/image");
const user = require("./controllers/user");

const auth = require("./middleware/auth");

// User routes
router.post("/user/login", auth.findUser, auth.checkPassword, auth.generateToken, user.login);
router.post("/user/register", auth.hashPassword, user.register);

router.get("/user/likes", common.basic); // Show list of user's likes.

router.put("/user/update", common.basic); // Update email, password, etc.

router.delete("/user/delete", common.basic);


// Image routes
router.post("/image/like", auth.verifyToken, image.like); // Add to table if item doesn't exist, and to user's likes.

router.get("/image/likes", common.basic); // Get list of most liked images.

router.delete("/image/unlike", auth.verifyToken, image.unlike); // Remove from user's likes, and remove from table if not liked by any user.


// Other routes
router.get("/unsplash/getlist", common.getImages); // Grab images from unsplash.
router.get("/unsplash/getrandom", common.basic); // Grab a random image from unsplash.


// Testing routes
// TODO: Remove before final hand-in.
router.get("/testtoken", auth.verifyToken, common.basic);

module.exports = router;
