const categoryModel = require('../models/category')
var jwt = require('jsonwebtoken');


module.exports = {

    getAllCategory: (req, res)=>{
        categoryModel.getAllCategory()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    getCategoryID: (req, res)=>{
        const id_category = req.params.id_category
        categoryModel.getCategoryID(id_category)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    //menambahkan item ke cart
    insertCategory: (req, res)=>{
        let data = {            
            name: req.body.name    
        }
        
        categoryModel.insertCategory(data)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    updateCategory: (req, res)=>{
        const id_category = req.params.id_category
 
        let data = {            
            name: req.body.name    
        }
        
        
        categoryModel.updateCategory(data, id_category)
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    },

    deleteCategory: (req, res)=>{
        const id_category = req.params.id_category;
        categoryModel.deleteCategory(id_category)
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
