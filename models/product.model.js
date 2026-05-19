const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter item name"]
        },
        description: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            enum: ['found', 'lost'],
            required: [true, "Please specify if item is lost or found"]
        },
        category: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['active', 'recovered'],
            default: 'active'
        },
        locationFound: {
            type: String,
            default: ''
        },
        locationDroppedOff: {
            type: String,
            default: ''
        },
        lastSeenLocation: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
