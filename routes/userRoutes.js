const express = require('express');

// Local Imports
const userControllers = require('./../controllers/userControllers');

// Create Router
const router = express.Router();

router.use(userControllers.protect);

router.get('/dashboard', userControllers.getDashboard);

router.route('/profile')
    .get(userControllers.getUserProfile)
    .post(userControllers.uploadImage, userControllers.submitUserProfile);

router.post('/password', userControllers.submitChangePassword);

router.post('/order/:dish/:user', userControllers.submitOrder);

router.delete('/order/:id', userControllers.deleteOrder);


router.get('/recommended', userControllers.getUserRecommed);


module.exports = router;