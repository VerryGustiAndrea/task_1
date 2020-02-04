const connection = require('../config/db');

module.exports={

    getCart: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT users.name as 'users', product.name as 'product', category.name as 'category', product.price, cart.qty, cart.time FROM cart INNER JOIN users ON cart.id_user = users.id INNER JOIN product ON cart.id_product = product.id INNER JOIN category ON product.id_category = category.id", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    getCheckout: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT users.name as 'users', product.name as 'product', category.name as 'category', product.price, cart.qty, cart.time FROM cart INNER JOIN users ON cart.id_user = users.id INNER JOIN product ON cart.id_product = product.id INNER JOIN category ON product.id_category = category.id WHERE status_checkout = 1", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    getHistory: () =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT users.name as 'users', product.name as 'product', category.name as 'category', product.price, cart.qty, cart.time FROM cart INNER JOIN users ON cart.id_user = users.id INNER JOIN product ON cart.id_product = product.id INNER JOIN category ON product.id_category = category.id WHERE status_pembayaran = 1", (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },



    //insert data ke tabel chart CREATE
    insertCart: (data) =>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO cart SET ?", data, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },
        // KODE TRANSAKSI
    getCode: (id_users) =>{
        return new Promise((resolve, reject)=> {
            connection.query("INSERT INTO invoice SET code=LPAD(FLOOR(RAND() * 9999999999.99), 10, '0'),status_checkout = 0, id_users=?", id_users, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    // ADD product to chart
    check_invoice_code: (id_users, data) =>{
        let code = 0;
        const id = parseInt(data.id)
        return new Promise((resolve, reject)=> {
            connection.query("SELECT * FROM invoice WHERE status_checkout=0 AND id_users =?", id_users, (err, result)=>{
                result.forEach(e => {
                    code=e.id;
                });
                console.log(code)
                connection.query("SELECT * FROM product WHERE ")
            
                if(!err $$ ){
                    console.log(code)

                    //ADD
                    connection.query("INSERT INTO order_detail SET ?, id_kode_transaksi = ? ", [data, code])

                }else{
                    reject(new Error(err));

                }
            })
        })
    }
}