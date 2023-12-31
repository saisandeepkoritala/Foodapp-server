const User= require("../models/userModel");

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("1",email,password)
        const user = await User.findOne({ email }).select("+password");
        console.log("2",user)
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "Fail",
                error: "InvalidCredentials",
                message: "Invalid email or password",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });


        res.status(200).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (error) {
        console.error(error);
    }
};
