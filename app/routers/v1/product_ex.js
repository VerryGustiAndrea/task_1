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

const ProductController = require('../../controllers/product');
const auth = require('../../helpers/auth')



Router
.get('/',auth.verify, ProductController.getProduct)
.get('/detail/:id_product', ProductController.getProductID)
.get('/getdetail/:id_product', ProductController.getProductDetail)
.post('/insert',upload.single('images'), ProductController.insertProduct)
.patch('/update/:id_product', ProductController.updateProduct)
.post('/login', ProductController.loginUser)

module.exports = Router;