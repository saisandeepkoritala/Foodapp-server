const mongoose=require("mongoose");
const dotenv=require("dotenv");
const app=require("./app");

dotenv.config({path:`${__dirname}/config.env`})

const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.PASSWORD);
const port = process.env.PORT;

mongoose.connect(DB)
    .then((info)=>{
        console.log("connection is successful")
    })
    .catch((err)=>{
        console.log("error",err)
    })

    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })

