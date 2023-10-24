// Product Schema Model

const mongoose = require("mongoose");

const { 
    product_collection_enums,
    product_status_enums,
    product_size_enums,
    product_volume_enums
} = require("../lib/config");

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    product_name: {
        type: String, 
        required: true
    },

    product_collection: {
        type: String,
        required: true,
        enum: {
            values: product_collection_enums, // ["dish", "salad", "dessert", "drink", "etc"];
            message: "{VALUES} is not among permitted enum values" 
        }
    },

    product_status: {
        type: String,
        required: false,
        default: "PAUSED",
        enum: {
            values: product_status_enums, // ["PAUSED", "PROCESS", "DELETED"];
            message: "{VALUES} is not among permitted enum values" 
        }
    },

    product_price: {
        type: Number,
        required: true
    },

    product_discount: {
        type: Number,
        required: false,
        default: 0
    },

    product_left_cnt: {
        type: Number,
        required: true
    },

    product_size: {
        type: String,
        default: 'normal',
        required: function() {
            const sized_list = ['dish', 'salad', 'dessert'];
            return sized_list.includes(this.product_collection)
        },
        enum: {
            values: product_size_enums, // ["small", "normal", "large", "set"];
            message: "{VALUES} is not among permitted enum values" 
        }
    },

    product_volume: {
        type: String,
        default: 1,
        required: function() {
            return (this.product_collection === "drink");
        },
        enum: {
            values: product_volume_enums, // [0.5, 1, 1.2, 1.5, 2];
            message: "{VALUES} ruhsat etilgan qiymat emas!" 
        }
    },

    product_description: { type: String, required: true },
    product_images: { type: Array, required: false, default: [] },
    product_likes: { 
        type: Number, 
        required: false,
        default: 0
    },

    product_views: { 
        type: Number, 
        required: false,
        default: 0
    },

    restaurant_mb_id: { 
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: false
    },
}, {timestamps: true});

productSchema.index(
    {restaurant_mb_id: 1, product_name: 1, product_size: 1, product_volume: 1},
    {unique: true}
);

module.exports = mongoose.model("Product", productSchema);