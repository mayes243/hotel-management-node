const express = require('express');
const passport = require('passport');

// Local Imports
const authControllers = require('./../controllers/authControllers');
const backendControllers = require('./../controllers/backendControllers');
const dishesControllers = require('./../controllers/dishesControllers');
const categoryControllers = require('./../controllers/categoryControllers');
const testimonialControllers = require('./../controllers/testimonialControllers');
const bannerControllers = require('./../controllers/bannerControllers');
const galleryControllers = require('./../controllers/galleryControllers');

const { initializeAdmin } = require('./../passport-config');
initializeAdmin(passport);

// Create Router
const router = express.Router();

// Authentication
router.route('/login')
    .get(backendControllers.getLogin)
    .post(passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true,
        successFlash: true,
        session: true
    }));

router.use(authControllers.adminAuth);

router.use(backendControllers.globalAdminVariables);

router.route('/logout')
    .get(authControllers.adminLogout);

// Basic Dashboard
router.get('/dashboard', backendControllers.getDashboard);

// Admin Profile

router.route('/profile')
    .get(backendControllers.getProfileSettings);

router.put('/profile/:id', backendControllers.uploadSingle, backendControllers.submitProfileSettings);

// Site Settings
router.get('/site-settings', backendControllers.getSiteSettings);
router.put('/site-settings/:id', backendControllers.uploadSiteSettings, backendControllers.submitSiteSettings);

// Dishes
router.get('/all-dishes', dishesControllers.getAllDishes);

router.route('/add-dish')
    .get(dishesControllers.getAddDish)
    .post(dishesControllers.uploadImage, dishesControllers.submitAddDish);

router.route('/edit-dish/:id')
    .get(dishesControllers.getEditDish)
    .put(dishesControllers.uploadImage, dishesControllers.submitEditDish);

router.delete('/dish/delete/:id', dishesControllers.deleteDish);

router.route('/special')
    .get(dishesControllers.getSpecialDishes)
    .post(dishesControllers.submitSpecialDish);

router.delete('/special/:id', dishesControllers.deleteSpecial);

// Category

router.route('/category')
    .get(categoryControllers.getAllCategory)
    .post(categoryControllers.submitCategory);

router.route('/category/:id')
    .get(categoryControllers.getEditCategory)
    .put(categoryControllers.submitEditCategory)
    .delete(categoryControllers.deleteCategory);

// Testimonial

router.get('/all-testimonials', testimonialControllers.getAllTestimonials);

router.route('/add-testimonial')
    .get(testimonialControllers.getAddTestimonial)
    .post(testimonialControllers.uploadImage, testimonialControllers.submitAddTestimonial);

router.route('/testimonial/:id')
    .get(testimonialControllers.getEditTestimonial)
    .put(testimonialControllers.uploadImage, testimonialControllers.submitEditTestimonial)
    .delete(testimonialControllers.deleteTestimonial);

// Banner

router.get('/all-banners', bannerControllers.getAllBanners);

router.route('/add-banner')
    .get(bannerControllers.getAddBanner)
    .post(bannerControllers.uploadImage, bannerControllers.submitAddBanner);

router.route('/banner/:id')
    .get(bannerControllers.getEditBanner)
    .put(bannerControllers.uploadImage, bannerControllers.submitEditBanner)
    .delete(bannerControllers.deleteBanner);

// Gallery

router.route('/gallery')
    .get(galleryControllers.getGallery);

router.route('/add-image')
    .get(galleryControllers.getAddImage)
    .post(galleryControllers.uploadImage, galleryControllers.submitAddImage);

router.delete('/image/:id', galleryControllers.deleteImage);

// Messages

router.get('/messages', backendControllers.getAllMessages);

router.delete('/message/:id', backendControllers.deleteMessage);

// order aceept
router.post('/:id', backendControllers.updateOrder);
router.get('/accept/order/:id', backendControllers.acceptOrder);


module.exports = router;