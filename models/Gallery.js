const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Gallery must have a Title.']
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;