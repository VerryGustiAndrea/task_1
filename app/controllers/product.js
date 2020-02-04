const productModel = require('../models/product')
var jwt = require('jsonwebtoken');


module.exports = {
    getAllProduct: (req, res)=>{
        productModel.getAllProduct()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    getProductID: (req, res)=>{
        const id_product = req.params.id_product
        productModel.getProductID(id_product)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    //menambahkan katalog product
    insertProduct: (req, res)=>{
        console.log(req.file.filename);
        let data = {            
            name : req.body.name,
            description : req.body.description,
            id_category : req.body.id_category,
            images : `http://localhost:4000/uploads/${req.file.filename}`,
            price : req.body.price,
            stock : req.body.stock,
            updated_at : new Date(),
            created_at : new Date()            
        }
        
        productModel.insertProduct(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updateProduct: (req, res)=>{
        const id_product = req.params.id_product
 
        let data = {            
            name : req.body.name,
            description : req.body.description,
            id_category : req.body.id_category,
            images : `http://localhost:4000/uploads/${req.file.filename}`,
            price : req.body.price,
            stock : req.body.stock,
            updated_at : new Date(),
            created_at : new Date()            
        }
        
        productModel.updateProduct(data, id_product)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    deleteProduct: (req, res)=>{
        const id_product = req.params.id_product;
        productModel.deleteProduct(id_product)
            .then((result)=>{
                res.json(result)
            })
            .catch(err=>console.log(err));
    },

    loginUser: (req, res)=>{
        var token = jwt.sign({ id: 1, name: 'verry' }, process.env.PRIVATE_KEY);
        res.json({
            token:token
        })
    }

}
