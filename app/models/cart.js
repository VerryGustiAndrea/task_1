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

        // GENERATE KODE TRANSAKSI
    getCode: (id_users) =>{
        return new Promise((resolve, reject)=> {
            connection.query("SELECT * from invoice WHERE status_checkout = 0 AND id_users=?", id_users, (err, hasil)=>{


                if(hasil.length === 0){
                    console.log('Berhasil Mendapatkan Kode Invoice, Selamat Berbelanja')
                    connection.query("INSERT INTO invoice SET code=LPAD(FLOOR(RAND() * 9999999999.99), 10, '0'),status_checkout = 0,status_pembayaran = 0, id_users=?", id_users, (err, result)=>{
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
            connection.query("SELECT invoice.code AS 'invoice', product.name AS 'product', product.price AS 'price',category.name AS 'category', order_detail.qty, order_detail.total_price FROM order_detail INNER JOIN invoice ON order_detail.id_code= invoice.id INNER JOIN product ON order_detail.id_product=product.id INNER JOIN category ON product.id_category=category.id WHERE status_checkout=0 AND id_users =?", id_users, (err, result)=>{
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        })
    },

    // CHECKOUT USER
    getCheckout: (id_users) =>{
        return new Promise((resolve, reject)=> {
            let data = {
                id_users : id_users,
                invoice : 0,
                total_price:0,

            }
            connection.query("SELECT invoice.code AS 'invoice', product.name AS 'product', product.price AS 'price',category.name AS 'category', order_detail.qty, order_detail.total_price FROM order_detail INNER JOIN invoice ON order_detail.id_code= invoice.id INNER JOIN product ON order_detail.id_product=product.id INNER JOIN category ON product.id_category=category.id WHERE status_checkout=0 AND id_users = ?",id_users, (err, result)=>{
                result.forEach(e =>{
                    data.invoice =  e.invoice;
                    data.total_price += e.total_price;
                    })    
                    connection.query("INSERT INTO cart SET ?",data)            
                if(!err){                    
                    console.log('berhasil menambahkan data ke cart')
                    connection.query("UPDATE invoice SET status_checkout = 1 WHERE status_checkout = 0 AND id_users = ?", id_users)
  
                    resolve(result);
                }else{
                    reject(new Error(err));
                }                
            })
        })    
    },

    // GET VIEW ORDER
    getViewOrder: (id_users) =>{
        return new Promise((resolve, reject)=> {

            connection.query("SELECT users.name, cart.* FROM cart INNER JOIN invoice ON cart.invoice=invoice.code INNER JOIN users ON invoice.id_users=users.id WHERE status_checkout = 1 AND status_pembayaran = 0 AND cart.id_users = ?", id_users, (err, result)=>{
                let name = ''
                let invoice = 0
                let total_price_order = 0
                result.forEach(e=>{
                    name = e.name
                    invoice = e.invoice
                    total_price_order += e.total_price
                })
                connection.query("SELECT invoice.code AS 'invoice', product.name AS 'product', product.price AS 'price',category.name AS 'category', order_detail.qty, order_detail.total_price FROM order_detail INNER JOIN invoice ON order_detail.id_code= invoice.id INNER JOIN product ON order_detail.id_product=product.id INNER JOIN category ON product.id_category=category.id WHERE status_checkout=1 AND id_users = ? AND code = ?",[id_users, invoice], (err, hasil)=>{
                    let data = {
                        name : name,
                        invoice : invoice,
                        total_price_order : total_price_order,
                        order_detail : hasil
                        }

                    if(err || data.order_detail.length === 0){
                        reject(new Error(err));
                    }else{
                        
                        resolve(data);
                    }

                            
                })
            })
        })
    },

    // GET HISTORY ORDER
    getHistory: (id_users) =>{
        return new Promise((resolve, reject)=> {

            connection.query("SELECT users.name, cart.* FROM cart INNER JOIN invoice ON cart.invoice=invoice.code INNER JOIN users ON invoice.id_users=users.id WHERE status_checkout = 1 AND status_pembayaran = 1 AND cart.id_users = ?", id_users, (err, result)=>{
                let name = ''
                let invoice = 0
                let total_price_order = 0
                result.forEach(e=>{
                    name = e.name
                    invoice = e.invoice
                    total_price_order += e.total_price
                })
                connection.query("SELECT cart.product, cart.category, cart.price, cart.qty, cart.total_price, cart.date FROM cart INNER JOIN invoice ON cart.invoice=invoice.code INNER JOIN users ON invoice.id_users=users.id WHERE status_checkout = 1 AND status_pembayaran = 1 AND cart.id_users = ?", id_users, (err, hasil)=>{
                    let data = {
                        name : name,
                        invoice : invoice,
                        total_price_order : total_price_order,
                        order_detail : hasil
                        }

                    if(err || data.order_detail.length === 0){
                        reject(new Error(err));
                    }else{
                        
                        resolve(data);
                    }

                            
                })
            })
        })
    },


    //ACC PAYMENT USER
    accPayment: (id_users) =>{
        return new Promise((resolve, reject)=> {
                connection.query("UPDATE invoice SET status_pembayaran = 1 WHERE id = ?", id_users, (err, result))      
                if(!err){
                                  
                    resolve(result);
                }else{
                    reject(new Error(err));

                }
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
            connection.query("SELECT * FROM invoice WHERE status_checkout=0 AND id_users = ?", id_users, (err, result)=>{
                result.forEach(e => {
                    code=e.id;
                });
                console.log(code)
            
                if(!err && result.length != 0){
                    connection.query("SELECT * FROM product WHERE id=?", data.id_product, (err, hasil)=>{
                        hasil.forEach(f=>{
                        stock = f.stock;
                        price = f.price;
                        console.log(stock)
                        })
                    total_price = price * qty;
                    stock_final = stock - qty;
                    console.log(total_price)
                        if(!err && stock >= qty){
                            connection.query("SELECT * FROM order_detail WHERE id_product = ? AND id_code = ?", [data.id_product, code], (err, answer)=>{
                                
                            
                            if(answer.length === 0){
                                console.log('disini')
                                connection.query("INSERT INTO order_detail SET ?, total_price= ?, id_code = ?", [data, total_price, code])
                                connection.query("UPDATE product SET stock = ? WHERE id = ?", [stock_final, data.id_product])
                            }else{
                                console.log('ternyata disini')
                                connection.query("UPDATE order_detail SET id_product= ?, qty= qty + ?, total_price= ?, id_code = ?", [data.id_product, data.qty, total_price, code])
                                connection.query("UPDATE product SET stock = ? WHERE id = ?", [stock_final, data.id_product])
                            }
                            })
                        }else{
                            console.log('Stok Tidak Cukup')
                        }
                    })
                    resolve(result);
                    // //ADD
                    // connection.query("INSERT INTO order_detail SET ?, id_kode_transaksi = ? ", [data, code])

                }else{
                    resolve({msg :'silakan ambil kode invoice'});

                }
            })
        })
    },

    // REDUCE product FROM chart
    reduceCartUser: (id_users, data) =>{
        let code = 0;
        let qtyback = 0;
        return new Promise((resolve, reject)=> {
            connection.query("SELECT * FROM invoice WHERE status_checkout=0 AND id_users = ?", id_users, (err, result)=>{
                result.forEach(e => {
                    code=e.id;
                });
                console.log(code)
            
                if(!err){
                    connection.query("SELECT * FROM  order_detail  WHERE id_code = ? AND id_product = ?",[code, data.id_product] , (err, hasil)=>{
                        hasil.forEach(f=>{
                        qtyback = f.qty;
                        console.log(qtyback)
                        })

                    //balikin qty ke stock
                    if(!err){
                        connection.query("UPDATE product  SET stock = stock + ? WHERE id = ?", [qtyback, data.id_product])
                        connection.query("DELETE FROM  order_detail  WHERE id_code = ? AND id_product = ?",[code, data.id_product])

                    
                    }else{
                        console.log('Gagal Mendelete Produk')
                    }    
                    })
                    resolve(result);
                }else{
                    reject(new Error(err));

                }
            })
        })
    }
}