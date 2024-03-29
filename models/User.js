const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide your name.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 2,
        select: false
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    country: {
        type: String,
        required: [true, 'Please provide a country']
    },
    image: {
        type: String
    }
});

userSchema.pre('save', async function (next) {
    // Has the password with cost of 12
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const user = mongoose.model('user', userSchema);
module.exports = user;