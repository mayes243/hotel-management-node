const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Dish must have a name.']
    },
    slug: String,
    index: {
        type: Number
    }

});

// Slugify
categorySchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;