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
            connection.query("SELECT * from invoice WHERE status_checkout = 0 AND id_users=?", id_users, (err, hasil)=>{
                console.log(hasil)

                if(hasil.length === 0){
                    console.log('Berhasil Mendapatkan Kode Invoice, Selamat Berbelanja')
                    connection.query("INSERT INTO invoice SET code=LPAD(FLOOR(RAND() * 9999999999.99), 10, '0'),status_checkout = 0, id_users=?", id_users, (err, result)=>{
                        if(!err){
                            resolve(result);
                        }else{
                            reject(new Error(err));
                        }
                    })

                }else{
                    console.log('Kode Invoice Sebelumnya Masih Ada!')
                    reject(new Error(err));
                }  
            })
        })
    },

    // get cart user
    getCartUser: (id_users) =>{

        return new Promise((resolve, reject)=> {
            connection.query("SELECT invoice.code AS 'invoice', product.name AS 'product', product.price AS 'price', order_detail.qty, order_detail.total_price FROM order_detail INNER JOIN invoice ON order_detail.id_code= invoice.id INNER JOIN product ON order_detail.id_product=product.id WHERE status_checkout=0 AND id_users =?", id_users, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    // ADD product to chart
    addCartUser: (id_users, data) =>{
        let code = 0;
        let stock = 0;
        let price = 0;
        let total_price = 0;
        let qty = parseInt(data.qty);

        return new Promise((resolve, reject)=> {
            connection.query("SELECT * FROM invoice WHERE status_checkout=0 AND id_users =?", id_users, (err, result)=>{
                result.forEach(e => {
                    code=e.id;
                });
                console.log(code)
            
                if(!err){
                    connection.query("SELECT * FROM product WHERE id=?", data.id_product, (err, hasil)=>{
                        hasil.forEach(f=>{
                        stock = f.stock;
                        price = f.price;
                        console.log(stock)
                        })
                    total_price = price * qty;
                    stock_final = stock - qty;
                    console.log(total_price)
                        if(stock >= qty){
                            connection.query("INSERT INTO order_detail SET ?, total_price= ?, id_code = ?", [data, total_price, code])
                            connection.query("UPDATE product SET stock = ? WHERE id = ?", [stock_final, data.id_product])
                        }else{
                            console.log('Stok Tidak Cukup')
                        }
                    })
                    resolve(result);
                    // //ADD
                    // connection.query("INSERT INTO order_detail SET ?, id_kode_transaksi = ? ", [data, code])

                }else{
                    reject(new Error(err));

                }
            })
        })
    }
}