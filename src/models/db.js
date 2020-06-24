const mysql = require("mysql");
const dbConfig = require("../config/dbConfigCloud");

var connecction = mysql.createPool({
//var connecction = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB//,
    //port: dbConfig.PORT
});

module.exports = connecction;
