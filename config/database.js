require('dotenv').config();
const mysql = require('mysql2/promise');

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}

<<<<<<< HEAD
const db = mysql.createPool(options)

module.exports = {
  options,
  db
};
=======
module.exports = db;

>>>>>>> 718d2b2fccf30b50edf5fd443f4c08478d46885d
