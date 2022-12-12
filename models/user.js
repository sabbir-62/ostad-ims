// Requirements
const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// Create a User Schema
const userSchema = mongoose.Schema({

    email: {
        type: String,
        validate: [validator.esEmail, "Provide a valid Email"],
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
        validate: [validator.isURl, "Please provide a valid url"]
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


// Exports User Schema
module.exports = mongoose.model('User', userSchema);