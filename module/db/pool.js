const mysql = require("mysql2/promise");
const info = require('../../../config/db.json')

const pool = mysql.createPool(info);

module.exports = pool; 