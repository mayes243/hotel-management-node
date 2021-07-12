const mongoose = require('mongoose');

const specialSchema = mongoose.Schema({

    dish: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dish'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Special = mongoose.model('Special', specialSchema);
module.exports = Special;