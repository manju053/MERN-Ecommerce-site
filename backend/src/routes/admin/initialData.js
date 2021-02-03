const express = require('express');
const { requireSignIn } = require('../../common-middleware/index');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.post('/initialdata', requireSignIn ,initialData);



module.exports = router;