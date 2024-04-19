const express = require("express");
const userRouter = require("./Routes/userRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");  

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());  

app.get('/success', async (req, res) => {
    try {
        res.json({
            status:"success",
            message:"Payment Success"
        });
    } catch (error) {
        
        console.error("Error:", error);
        res.status(500).send('An error occurred.');
    }
});


app.use("/api/v1/user", userRouter);

module.exports = app;
