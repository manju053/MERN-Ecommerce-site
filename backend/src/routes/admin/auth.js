const express = require('express');
const { signUp, signIn, requireSignIn } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);


module.exports = router;