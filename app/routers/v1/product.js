const express = require('express');
const multer = require('multer');

// var whitelist = ['http://localhost:4000/v1 ', 'http://example2.com']
// var corsoption = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const cors = require('cors');

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


//SEARCH
.get('/search/:name', ProductController.searchProduct)

//SORT PRODUCT BY NAME
.get('/sortbyname', ProductController.sortProductName)

//SORT PRODUCT BY CATEGORY
.get('/sortbycategory', ProductController.sortProductCategory)

//SORT PRODUCT BY UPDATE
.get('/sortbyupdate', ProductController.sortProductUpdate)

//PAGINATION
.get('/page/:page', ProductController.pagination)



module.exports = Router;