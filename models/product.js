// Requirements
const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;


// Create a Product Schema
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        unique: [true, "Name must be unique"],
        lowercase: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too long"]
    },

    description: {
        type: String,
        required: true
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },

    imageUrl: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Wrong URL"]
    }],

    category: {
        type: String,
        required: true
    },

    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    }
},
{
    timestamps: true,
    versionKey: false
}
)


// Check product is available or not
productSchema.pre("save", function(next){
    console.log("Before saving data");

    if(this.quantity == 0){
        this.status = "out-of-stock";
    }

    next();
})


// Create a Products Collection and Exports productSchema
module.exports = mongoose.model("Product", productSchema);