const connection = require('../config/db');

module.exports={

    checkUser: (email) =>{
        return new Promise((resolve, reject)=> {
            let data ={
                passwordsql : '',
                username : '',
                id :0
            }

            connection.query("SELECT * FROM users WHERE email= ?",email, (err, result)=>{
                result.forEach(e=>{
                    data.passwordsql = e.password
                    data.username = e.name
                    data.id = e.id
                    
                })
                console.log(data.id)
                if(!err && result.length > 0){
                    resolve(data);
                }else{
                    reject(new Error(err));
                }
            })
        })
    }
}