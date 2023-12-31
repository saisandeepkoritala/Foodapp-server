const mongoose= require("mongoose");
const validator=require("validator");
const bcrypt= require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is needed"]
    },
    email:{
        type:String,
        required:[true,"Email is needed"],
        unique:true,
        validate:[validator.isEmail,"Please Provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Need password"],
        minlength:8,
        select:false
    }, 
    passwordConfirm:{
        type:String,
        required:[true,"Password confirmation is needed"],
        validate:{
            validator:function(value){
                return value===this.password;
            },
            message:"Password is not same"
        }
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)

    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword =async function(password,userPassword){
    return await bcrypt.compare(password,userPassword)
}

const User = mongoose.model("Fooduser",userSchema);

module.exports = User;