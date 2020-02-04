const express = require('express');
const Router = express.Router();

const ProductController = require('../../controllers/product');
const auth = require('../../helpers/auth')



Router
.post('/login', ProductController.loginUser)

module.exports = Router;