const edge = require('edge.js');

// Local Imports
const countries = require('./../utils/countriesData');

const SiteSetting = require('./../models/SiteSetting');
const Dish = require('./../models/Dish');
const Special = require('./../models/Special');
const Category = require('./../models/Category');
const Testimonial = require('./../models/Testimonial');
const Gallery = require('./../models/Gallery');
const Banner = require('./../models/Banner');
const Message = require('./../models/Message');
const User = require('./../models/User');

exports.globalFrontendVariables = async (req, res, next) => {

    const site = await SiteSetting.findOne({ sudo: 'main' });

    if (site) {
        edge.global('site', site);
    }

    next();
};

exports.getIndexPage = async (req, res) => {

    const allBanners = await Banner.find().sort('-createdAt').limit(3);
    const specialMenu = await Special.find().sort('-createdAt').populate('dish').limit(4);
    const allTestimonials = await Testimonial.find().sort('-createdAt').limit(5);

    res.render('frontend/index', {
        title: 'Home',
        allBanners,
        specialMenu,
        allTestimonials
    });
};

exports.getContactPage = (req, res) => {
    res.render('frontend/contact', {
        title: 'Contact'
    });
};

exports.getMenuPage = async (req, res) => {

    const dishes = await Dish.find().sort('-createdAt').populate('category');
    const categories = await Category.find().sort('index');

    res.render('frontend/menu', {
        title: 'Menu',
        dishes,
        categories
    });
};

exports.getSpecialMenuPage = async (req, res) => {

    const dishes = await Dish.find().sort('-createdAt').populate('category');
    const categories = await Category.find().sort('index');

    const user = await User.findById(req.params.id);

    const specialMenu = dishes.filter(item => item.country == user.country);

    res.render('frontend/menu', {
        title: 'Menu',
        dishes,
        categories,
        specialMenu
    });

};

exports.getGalleryPage = async (req, res) => {

    const allImages = await Gallery.find().sort('-createdAt').limit(12);

    res.render('frontend/gallery', {
        title: 'Gallery',
        allImages
    });
};

exports.submitContactForm = async (req, res) => {

    const newMessage = new Message({
        ...req.body
    });

    const savedMessage = await newMessage.save();
    req.flash('success-message', `Thank You ${savedMessage.name}, your message has been sent Successfully!`);
    res.redirect(req.originalUrl);
};

// login Register

exports.getLoginPage = (req, res) => {
    res.render('frontend/login', {
        title: 'Login'
    });
};

exports.getRegisterPage = async (req, res) => {
    res.render('frontend/register', {
        title: 'Register',
        countries
    });
};