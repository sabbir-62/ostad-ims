// Requirements
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;


// Create a storeSchema
const storeSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: ["dhaka", "rajshahi", "khulna", "chittagong", "sylhet", "barishal"],
            message: "{VALUE} is not correct division"
        }
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User"
        }
    }
},
{
    timestamps: true,
    versionKey: false
}
)


// Create a Store Collection and exports storeSchema
module.exports = mongoose.model("Store", storeSchema);