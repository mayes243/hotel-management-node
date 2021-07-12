const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Dish must have a name.']
    },
    image: {
        type: String,
        required: [true, 'Dish must have a image.']
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Dish must have a price.']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    country: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;