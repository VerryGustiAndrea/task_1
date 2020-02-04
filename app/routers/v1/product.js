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
const auth = require('../../helpers/auth');



Router
.get('/getall', ProductController.getAllProduct)
.get('/ID/:id_product', ProductController.getProductID)
.post('/insert', upload.single('images'), ProductController.insertProduct)
.delete('/del/:id_product', ProductController.deleteProduct)
.patch('/update/:id_product', upload.single('images'), ProductController.updateProduct)



module.exports = Router;