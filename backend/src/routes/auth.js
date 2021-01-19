const express = require('express');
const { signUp, signIn } = require('../controller/auth');
const { validateRequest, isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.post('/signin', validateSigninRequest, isRequestValidated, signIn);

router.post('/signup', validateSignupRequest, isRequestValidated, signUp);


module.exports = router;