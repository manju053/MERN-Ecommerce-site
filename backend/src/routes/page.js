const express = require('express');
const { requireSignIn, adminMiddleware, upload } = require('../common-middleware');
const router = express.Router();



const { createPage, getPage } = require('../controller/page');
router.post('/page/create', requireSignIn, adminMiddleware, upload.fields([
    {name: 'banners'},
    {name: 'products'}
]), createPage);
router.get('/page/:category/:type', getPage)


module.exports = router;