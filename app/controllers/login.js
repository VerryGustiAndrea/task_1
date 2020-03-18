const productModel = require('../models/login')
var jwt = require('jsonwebtoken');

module.exports = {

    loginUser: (req, res)=>{
        var token = jwt.sign({ id: 1, name: 'verry' }, process.env.PRIVATE_KEY);
        res.json({
            token:token
        })
    },

    login: (req, res)=>{

    },

    checkUser: (req, res)=>{
        email = req.body.email;
        password = req.body.password;
        console.log(email)
        productModel.checkUser(email, password)
        .then((data)=>{
 
            if(data.passwordsql === password){
                console.log('Password match')
                var token = jwt.sign({ id: data.id, name: data.username }, process.env.PRIVATE_KEY);
                res.json({
                    token:data.id + '#' + token,
                    id_user:data.id
                })
                console.log(token)
            }else{
                console.log('Password incorrect')
                res.json({msg : 'Email Atau Password Salah!'})
            }
        })
        .catch(err=>res.json({msg : 'Email Atau Password Salah!'}))
    }




}