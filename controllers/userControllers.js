const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');

// Local Imports
const countries = require('./../utils/countriesData');
const fileUpload = require('./../utils/fileUpload');
const { deleteImage } = require('./../utils/customFunctions');

const User = require('./../models/User');
const Dish = require('./../models/Dish');
const Order = require('./../models/Order');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const jwtToken = (user, res) => {

    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        // secure: true,
        httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);
    res.redirect('/');
};

exports.submitRegister = async (req, res) => {
    const newUser = new User({
        ...req.body
    });

    const user = await newUser.save();

    jwtToken(user, res);
};

exports.submitLogin = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        req.flash('error-message', 'Incorrect Email or Password');
        return res.redirect('/login');
    };

    jwtToken(user, res);
};

exports.protect = async (req, res, next) => {

    // 1) Getting Token and check if it's therefore
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        req.flash('error-message', 'Please Login!');
        return res.redirect('/login');
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        req.flash('error-message', 'Please Login!');
        return res.redirect('/login');
    }

    // Grant Access to Protected Route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
};

exports.isLoggedIn = async (req, res, next) => {

    if (req.cookies.jwt) {

        try {

            // 1) Verify Token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);

            if (!currentUser) {
                return next();
            }

            // There is a logged in user
            req.client = currentUser;
            res.locals.user = currentUser;
            return next();

        } catch (err) {
            return next();
        }

    }

    next();
};

exports.userLogout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.redirect('/login');
};

exports.getDashboard = async (req, res) => {

    const userId = req.client._id;
    const userOrders = await Order.find({ user: userId }).populate('dish');

    res.render('frontend/user/dashboard', {
        title: 'User Dashboard',
        userOrders
    });
};

// Order

exports.submitOrder = async (req, res) => {
    const orderedItem = await Dish.findById(req.params.dish);
    const user = await User.findById(req.params.user);

    const newOrder = new Order({
        dish: orderedItem._id,
        user: user._id
    });

    const savedOrder = await newOrder.save();
    req.flash('success-message', 'Order successfully submitted.');
    res.redirect('/user/dashboard');
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId).populate('dish');
    req.flash('success-message', `${deletedOrder.dish.name} has been Cancelled!`);
    res.redirect('/user/dashboard');
}

// User Profile

exports.uploadImage = fileUpload.single('image');

exports.getUserProfile = (req, res) => {

    res.render('frontend/user/profile', {
        title: 'Edit Profile',
        countries
    });
};

exports.submitUserProfile = async (req, res) => {

    const user = req.user;

    let image = user.image;

    if (req.file) {
        deleteImage(user, req);
        image = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        ...req.body,
        image
    });

    req.flash('success-message', `Profile Successfully Updated!`);
    res.redirect(req.originalUrl);
};

exports.submitChangePassword = async (req, res) => {

    const id = req.user._id;

    const user = await User.findById(id).select('+password');

    const { oldpassword, newpassword } = req.body;

    const passwordMatched = await user.correctPassword(oldpassword, user.password);

    if (!passwordMatched) {
        req.flash('error-message', 'Please enter correct password.')
        return res.redirect('/user/profile');
    };

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newpassword, salt);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        password
    });

    req.flash('success-message', 'Password Successfully Updated!');
    res.redirect('/user/profile');

};

exports.getUserRecommed = (req, res) => {

    res.render('frontend/user/recommed', {
        title: 'Recommed',
    });
};