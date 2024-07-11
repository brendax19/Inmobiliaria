const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inmobiliaria"
})

connection.connect((err)=>{
    if(err) throw err;
    console.log("Conexión con la db correcta");
    
})

module.exports = connection;