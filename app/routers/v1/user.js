const express = require('express');
const Router = express.Router();

const LoginController = require('../../controllers/login');
const auth = require('../../helpers/auth')



Router
// .post('/login', ProductController.loginUser)

.post('/loginuser', LoginController.checkUser)

module.exports = Router;