const cartModel = require('../models/cart')
var jwt = require('jsonwebtoken');


module.exports = {



    // KODE TRANSAKSI
    getCode: (req, res)=>{
        const id_users = req.params.id_users
        cartModel.getCode(id_users)
        .then((result)=>{
            res.json(result)
            console.log(result);
        })
        .catch(err=>console.log(err))
    },



    // GET CART USERS
    getCartUser: (req, res)=>{
        const id_users = req.params.id_users

        cartModel.getCartUser(id_users)
        .then((result)=>{
            res.json(result)
            // console.log(result);
        })
        .catch(err=>console.log(err))
    },

    // CHECKOUT
    getCheckout: (req, res)=>{
        const id_users = req.params.id_users
        cartModel.getCheckout(id_users)
        .then((result)=>{
            res.json(result)
            console.log("Checkout Berhasil");
        })
        .catch(err=>console.log(err))
    },
    
    //GET VIEW ORDER
    getViewOrder: (req, res)=>{
        const id_users = req.params.id_users
        cartModel.getViewOrder(id_users)
        .then((result)=>{
            res.json(result)
            console.log(result);
        })
        .catch(err=>console.log(err))
    },




    //ADD  PRODUCT DATA TO CART USERS
    Add: (req, res)=>{
        let id_user = req.params.id_users
        let data={
            
            id_product : req.body.id_product,
            qty : req.body.qty
        }
        cartModel.addCartUser(id_user, data)
        .then((result)=>{
            res.json(result)
            console.log(result);
        })
        .catch(
            err=>console.log(err)
        )
    },


    //REDUCE  PRODUCT DATA FROM CART USERS
    Reduce: (req, res)=>{
        let id_user = req.params.id_users
        let data={
            
            id_product : req.body.id_product,
            qty : req.body.qty
        }
        cartModel.reduceCartUser(id_user, data)
        .then((result)=>{
            res.json(result)
            console.log(result);
        })
        .catch(
            err=>console.log(err)
        )
    },


    loginUser: (req, res)=>{
        var token = jwt.sign({ id: 1, name: 'verry' }, process.env.PRIVATE_KEY);
        res.json({
            token:token
        })
    }

}
