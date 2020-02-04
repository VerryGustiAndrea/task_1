const connection = require('../config/db');

module.exports={

    getAllProduct: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    getProductID: (id_product) =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT product.*, category.name as 'category' FROM product INNER JOIN category ON product.id_category = category.id WHERE product.id = ?", id_product, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                    console.log('Belum ada invoice')
                }
            })
        })
    },

    //insert data ke tabel product CREATE
    insertProduct: (data) =>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO product SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    updateProduct: (data, id_product) =>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE product SET ? WHERE id = ?", [data, id_product], (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    deleteProduct: (id_product) => {
        return new Promise((resolve, reject)=>{
            connection.query("DELETE FROM  product WHERE id = ?", id_product, (err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}