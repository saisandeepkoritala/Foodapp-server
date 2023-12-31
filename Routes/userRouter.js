const express = require("express");
const userRouter = express.Router();
const {loginUser,signUp} = require("../controller/userController");

userRouter.route("/login").post(loginUser)

userRouter.route("/signup").post(signUp)


module.exports = userRouter;