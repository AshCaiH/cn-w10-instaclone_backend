const { Router } = require("express");
const userRouter = Router();

const controllers = require("./controllers");

userRouter.post("/user/login", controllers.basic);
userRouter.post("/user/register", controllers.basic);

userRouter.delete("/user/delete", controllers.basic);

module.exports = userRouter;
