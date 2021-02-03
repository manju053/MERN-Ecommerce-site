const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const router = express.Router();

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    }
  })

  const upload = multer({ storage });

const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');
router.post('/category/create', requireSignIn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getCategories', getCategories);
router.post('/category/updateCategory', upload.array('categoryImage'), updateCategories);
router.post('/category/deleteCategory', deleteCategories);

module.exports = router;