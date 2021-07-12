const express = require('express');

// Local Imports
const frontendControllers = require('./../controllers/frontendControllers');
const userControllers = require('./../controllers/userControllers');

// Create Router
const router = express.Router();

router.use(frontendControllers.globalFrontendVariables, userControllers.isLoggedIn);

router.get('/', frontendControllers.getIndexPage);

router.get('/menu', frontendControllers.getMenuPage);

router.get('/menu/:id', frontendControllers.getSpecialMenuPage);

router.get('/gallery', frontendControllers.getGalleryPage);

router.route('/contact')
    .get(frontendControllers.getContactPage)
    .post(frontendControllers.submitContactForm);

router.route('/login')
    .get(frontendControllers.getLoginPage)
    .post(userControllers.submitLogin);

router.route('/register')
    .get(frontendControllers.getRegisterPage)
    .post(userControllers.submitRegister);

router.get('/logout', userControllers.userLogout);

module.exports = router;