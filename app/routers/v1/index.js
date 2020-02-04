const express = require('express');

const product = require('./product');
const cart = require('./cart');
const category = require('./category');

const Router = express.Router();

Router.use('/product', product);
Router.use('/cart', cart);
Router.use('/category', category);

module.exports = Router;