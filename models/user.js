// Requirements
const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// Create a User Schema
const userSchema = mongoose.Schema({

    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minlength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbol: 1
                })
            },
            message: "Password {VALUE} is not strong enough"
        }
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(value){
                return value === this.password;
            },
            message: "Password don't match"
        }
    },

    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer"
    },

    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minlength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },

    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        minlength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },

    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },

    shippingAddress: String,

    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },
    
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive", "blocked"]
    },

    confirmationToken: String,

    confirmationTokenExpires: Date,

    passwordChangeAt: Date,

    passwordResetToken: String,

    passwordResetExpire: Date

},
{
    timestamps: true,
    versionKey: false
}
)


// Reset Password and save into Database
userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});


// Compare Password
userSchema.methods.comparePassword = function(password, hash){
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}


// Generate a token with expire time
userSchema.methods.generateConfirmationToken = function(){
    const token = crypto.randomBytes(32).toString("hex");
    
    this.confirmationToken = token;
    
    const date = new Date();

    date.setDate(date.getDate() + 1);
    this.confirmationTokenExpires = date;

    return token;
}


// Create a User Collection and Exports user Schema
module.exports = mongoose.model('User', userSchema);