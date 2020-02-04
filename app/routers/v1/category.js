const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const upload = multer({storage})


const Router = express.Router();

const CategoryController = require('../../controllers/category');
const auth = require('../../helpers/auth')



Router
.get('/getall', CategoryController.getAllCategory)
.get('/ID/:id_category', CategoryController.getCategoryID)
.post('/insert', CategoryController.insertCategory)
.delete('/del/:id_category', CategoryController.deleteCategory)
.patch('/update/:id_category', CategoryController.updateCategory)


module.exports = Router;