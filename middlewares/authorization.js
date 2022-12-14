const User = require('../models/user');
const {expressjwt} = require('express-jwt');
require('dotenv').config();


exports.requireSignIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});


exports.isAdmin = async(req, res, next) => {
    console.log("Auth Test", req.auth);
    try{
        const user = await User.findById(req.auth._id);
        if(user.role !== "admin"){
            return res.status(403).json({
                status: "Fail",
                message: "Unauthorized Admin resource"
            })
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
    }
};


exports.isManager = async(req, res, next) => {
    console.log("Auth Test", req.auth);
    try{
        const user = await User.findById(req.auth._id);
        if(user.role !== "store-manager"){
            return res.status(403).json({
                status: "Fail",
                message: "Unauthorized. Store manager resources"
            })
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
    }
}