const fs = require('fs');
const edge = require('edge.js');

// Local Imports
const fileUpload = require('./../utils/fileUpload');

const Admin = require('./../models/Admin');
const User = require('./../models/User');
const Order = require('./../models/Order');
const SiteSetting = require('./../models/SiteSetting');
const Message = require('./../models/Message');
const { updateOne } = require('./../models/User');


// Admin Controllers

exports.globalAdminVariables = (req, res, next) => {
    edge.global('admin', req.user)
    next();
};

exports.getLogin = (req, res) => {
    res.render('backend/login');
};

exports.getDashboard = async (req, res) => {

    const allOrders = await Order.find().populate('dish').populate({
        path: 'user',
        model: User
    });

    res.render('backend/dashboard', {
        title: 'Dashboard',
        allOrders
    });
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId).populate('dish');
    req.flash('success-message', `${deletedOrder.dish.name} has been Cancelled!`);
    res.redirect('/admin/dashboard');
}

// update order
exports.updateOrder = async (req, res) => {

    await Order.findByIdAndUpdate(req.params.id, {
        $set: {
            status: 'accept'
        }
    }, { new: true });
    res.redirect('/admin/dashboard');
    req.flash('success-message', `${Order.dish.name} has been Cancelled!`);
};

exports.updateOrderByAdmin = async (req, res) => {
  const action = req.params.action;
  const orderName = req.params.orderName;
  await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: action,
      },
    },
    { new: true }
  );
  req.flash(
    `${action == "decline" ? "error" : "success"}-message`,
    `${orderName} has been ${action}!`
  );
  res.redirect("/admin/dashboard");
};

// accept order
exports.acceptOrder = async (req, res) => {

    const allOrders = await Order.find().populate('dish').populate({
        path: 'user',
        model: User
    });

    res.render('backend/dashboard', {
        title: 'Dashboard',
        allOrders
    });
};

// Profile Settings

exports.getProfileSettings = async (req, res) => {
    const id = req.user._id;
    const adminDetail = await Admin.findById(id);

    res.render('backend/profile', {
        title: 'Profile Settings',
        adminDetail
    });
}

exports.uploadSingle = fileUpload.single('singleImage');

exports.submitProfileSettings = async (req, res) => {

    const seletedUser = await Admin.findById(req.params.id);

    let image = seletedUser.image;

    if (req.file) {

        fs.unlink(`${__dirname}/../public/uploads/${seletedUser.image}`, function (err) {
            if (err) {
                req.flash('error-message', `Oops! Something went wrong.`);
            }
        });

        image = req.file.filename;
    };

    const { name, email, address, phone } = req.body;

    await Admin.findByIdAndUpdate(req.params.id, {
        name,
        email,
        address,
        phone,
        image
    });

    req.flash('success-message', `Profle has been updated Successfully!`);
    res.redirect('/admin/dashboard');
};

// Site settings
exports.getSiteSettings = async (req, res) => {
    const siteSettings = await SiteSetting.findOne({ sudo: 'main' });

    res.render('backend/site-settings', {
        title: 'Site Settings',
        siteSettings
    });
};

exports.uploadSiteSettings = fileUpload.fields([
    {
        name: 'logo',
        maxCount: 1
    },
    {
        name: 'favicon',
        maxCount: 3
    }
]);

exports.submitSiteSettings = async (req, res) => {

    const siteSettings = await SiteSetting.findById(req.params.id);

    let logo = siteSettings.logo;
    let favicon = siteSettings.favicon;

    if (req.files.logo) {

        fs.unlink(`${__dirname}/../public/uploads/${siteSettings.logo}`, function (err) {
            if (err) {
                req.flash('error-message', `Oops! Something went wrong.`);
            }
        });

        req.files.logo.map(file => {
            logo = file.filename;
        })

    }

    if (req.files.favicon) {

        fs.unlink(`${__dirname}/../public/uploads/${siteSettings.favicon}`, function (err) {
            if (err) {
                req.flash('error-message', `Oops! Something went wrong.`);
            }
        });

        req.files.favicon.map(file => {
            favicon = file.filename;
        });

    }

    await SiteSetting.findByIdAndUpdate(req.params.id, {
        ...req.body,
        logo,
        favicon
    });

    req.flash('success-message', `Site Settings has been updated Successfully!`);
    res.redirect('/admin/site-settings');

};

// Messages

exports.getAllMessages = async (req, res) => {

    const allMessages = await Message.find().sort('-createdAt');

    res.render('backend/messages', {
        title: 'Messages',
        allMessages
    });
};

exports.deleteMessage = async (req, res) => {

    const deletedMessage = await Message.findByIdAndDelete(req.params.id);

    req.flash('success-message', `${deletedMessage.name}'s message has been deleted Successfully!.`);
    res.redirect('/admin/messages');
};