const mongoose=require("mongoose");
const dotenv=require("dotenv");
const app=require("./app");

dotenv.config({path:`${__dirname}/config.env`})

const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.PASSWORD);
const port = process.env.PORT;

mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("connection is successful")
    })
    .catch((err)=>{
        console.log("error",err)
    })

    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })

