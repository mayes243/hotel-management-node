const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Testimonial must have a name.']
    },
    image: {
        type: String,
        required: [true, 'Testimonial must have a image.']
    },
    position: {
        type: String
    },
    review: {
        type: String,
        required: [true, 'Testimonial must have a review']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;