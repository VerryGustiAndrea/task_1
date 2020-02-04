const express = require('express');
const Router = express.Router();

const CartController = require('../../controllers/cart');
const auth = require('../../helpers/auth')



Router
.get('/getall', CartController.getCart)
.get('/checkout', CartController.getCheckout)
.get('/history', CartController.getHistory)
.post('/insert', CartController.insertCart)


.get('/cartuser/:id_users', CartController.getCartUser)






//KODE TRANSAKSI
.post('/generate/:id_users', CartController.getCode)

//add
.post('/check/:id_users', CartController.Add)


module.exports = Router;