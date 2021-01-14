const express = require('express');
const { signUp, signIn, requireSignIn } = require('../controller/auth');
const router = express.Router();


router.post('/signin', signIn);

router.post('/signup', signUp);


module.exports = router;