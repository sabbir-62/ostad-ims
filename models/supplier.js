// Requirements
const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;


// Create a supplier Schema
const supplierSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"]
    },

    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true
    },

    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },

    contactNumber: [{
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    }],

    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    },

    tradeLicenseNumber: {
        type: Number,
        required: [true, "Please provide your trade license number"]
    },

    presentAddress: {
        type: String,
        required: [true, "Please provide your present address"],
    },

    permanentAddress: {
        type: String,
        required: [true, "Please provide your present address"]
    },

    location: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "chittagong", "sylhet", "khulna", "barishal", "rajshahi"],
            message: "{VALUE} is not a correct division"
        }
    },

    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    },

    nationalIdImageUrl: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
},
{
    timestamps: true,
    versionKey: false
}
)


// Create a Supplier model and exports supplierSchema
module.exports = mongoose.model('Supplier', supplierSchema);