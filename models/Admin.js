const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
    name:{
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
        minlength: 8,
        select: false
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    }
});

adminSchema.pre('save', async function(next) {
    // Has the password with cost of 12
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;