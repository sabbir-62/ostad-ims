const { signupService } = require("../services/user");



exports.signup = async(req, res) => {
    
    try{
        const user = await signupService(req.body);

        await user.save({
            validateBeforeSave: false
        });

        res.status(200).json({
            status: "success",
            message: "Successfully signed Up"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}