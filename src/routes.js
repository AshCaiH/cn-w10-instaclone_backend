const { Router } = require("express");
const router = Router();

const common = require("./common/controllers"); // TODO: Add controllers for image and other.

// User routes
router.post("/user/login", common.basic);
router.post("/user/register", common.basic);

router.get("/user/likes", common.basic); // Show list of user's likes.

router.put("/user/update", common.basic); // Update email, password, etc.

router.delete("/user/delete", common.basic);


// Stored image routes
router.post("/image/like", common.basic); // Add to table if item doesn't exist, and to user's likes.

router.get("/image/liked", common.basic); // Get list of most liked images.

router.delete("/images/like", common.basic); // Remove from user's likes, and remove from table if not liked by any user.


// Other routes
router.get("/unsplash/getlist", common.getImages); // Grab images from unsplash.
router.get("/unsplash/getrandom", common.basic); // Grab a random image from unsplash.

module.exports = router;
