


var mysql = require("mysql");
require('dotenv').config()
const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    waitForConnections: true,
    connectionLimit: 500,
    queueLimit: 0
});
console.log(process.env.DBHOST)
const query = async(quertText, table, params) => {
    var dbQuery = mysql.format(quertText, table);
    return new Promise((resolve, reject) => {
        var last = pool.query(dbQuery, params, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
        // console.log('last.sql', last.sql);
    });
}


module.exports = {
    query
}