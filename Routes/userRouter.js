const express = require("express");
const userRouter = express.Router();
const {loginUser,signUp,checkOut} = require("../controller/userController");

userRouter.route("/login").post(loginUser)

userRouter.route("/signup").post(signUp)

userRouter.route("/checkout").post(checkOut)


module.exports = userRouter;