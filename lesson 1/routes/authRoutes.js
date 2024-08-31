const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController')

router.get('/signup', authControllers.getSignupPage);

router.get('/login', authControllers.getLoginPage);

router.post('/signup', authControllers.postSignUp);

router.post('/login', authControllers.postLoginPage);

module.exports = router;