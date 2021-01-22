const express = require('express');
const { requireSignIn, userMiddleware } = require('../common-middleware');
const router = express.Router();

const { addItemToCart } = require('../controller/cart');
router.post('/user/cart/addtocart', requireSignIn, userMiddleware, addItemToCart);

module.exports = router;