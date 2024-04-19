const User= require("../models/userModel");
const stripe = require("stripe")("sk_test_51P5x7GRth6EVcji8my5sr84ZQ2cwP8DI1QD1pacPMp0fkrGVIkJS5KMtiekk1EuxO5BNzVkNDXQcYsLcECSMvChy00z2rcczfR")

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


exports.checkOut = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.products.map(item => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.alt_description,
                        },
                        unit_amount: Math.floor(item.likes * 100),
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

