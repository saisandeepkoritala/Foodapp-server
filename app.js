const express = require("express");
const userRouter = require("./Routes/userRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");  

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());  

app.use("/api/v1/user", userRouter);

module.exports = app;
