const express = require('express');
const { signUp, signIn, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignIn } = require('../../common-middleware/index');
const router = express.Router();


router.post('/admin/signin', validateSigninRequest, isRequestValidated, signIn);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signUp);
router.post('/admin/signout', requireSignIn, signout);


module.exports = router;