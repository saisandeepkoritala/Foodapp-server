const User= require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET)

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


exports.checkOut = async(req,res,next)=>{
    try{
        const {products} = req.body;
        // console.log(products)
        const lineItems=products.map((product)=>{
            return ({
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:product.alt_description,
                        image:product.urls.full
                    },
                    unit_amount:Math.floor(product.likes * 100),
                },
                quantity:1
            })
        })

        console.log(lineItems)
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel"
        })
        console.log(session)
        res.json({
            id:session.id
        })
    }
    catch(e){

    }
}
