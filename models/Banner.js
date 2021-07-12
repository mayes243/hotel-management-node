const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Banner must have a Title.']
    },
    image: {
        type: String
    },
    subTitle: {
        type: String,
        required: [true, 'Banner must have a Sub Title.']
    },
    content: {
        type: String,
        required: [true, 'Banner must have a content']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;