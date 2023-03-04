const mysql = require('mysql')
//配置连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'hive'
})


module.exports = db