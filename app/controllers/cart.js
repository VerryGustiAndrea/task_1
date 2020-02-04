const cartModel = require('../models/cart')
var jwt = require('jsonwebtoken');


module.exports = {


    getCart: (req, res)=>{
        cartModel.getCart()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    getCheckout: (req, res)=>{
        cartModel.getCheckout()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    getHistory: (req, res)=>{
        cartModel.getHistory()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },
    //menambahkan item ke cart
    insertCart: (req, res)=>{
        let data = {
            id_user : req.body.id_user,
            id_product : req.body.id_product,
            qty : req.body.qty,
            status_pembayaran : req.body.status_pembayaran,
            date : new Date()      
        }
        
        cartModel.insertCart(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

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

    //ADD  PRODUCT DATA TO CART
    Add: (req, res)=>{
        
        const id_users = req.params.id_users
        let data={
            id_product : req.body.id_product,
            qty : req.body.qty
        }
        cartModel.check_invoice_code(id_users, data)
        .then((hasil)=>{
            res.json(hasil)
            console.log(hasil);
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
