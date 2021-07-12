const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    dish: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dish'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'decline'],
        default: 'pending'
    }

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;