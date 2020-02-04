const express = require('express');
const Router = express.Router();

const CartController = require('../../controllers/cart');
const auth = require('../../helpers/auth')



Router

//KODE TRANSAKSI
.post('/generate/:id_users', CartController.getCode)


//add
.post('/add/:id_users', CartController.Add)

//reduce
.post('/reduce/:id_users', CartController.Reduce)


// View Cart User
.get('/cartuser/:id_users', CartController.getCartUser)

// Checkout User
.post('/checkout/:id_users', CartController.getCheckout)

// View Order User
.get('/vieworder/:id_users', CartController.getViewOrder)





module.exports = Router;