"use strict"

if(process.env != 'production') {
  require('dotenv').config();
}

module.exports =  {
  url: process.env.DB_POSTGRES_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
}

// Configuración para mysql
/*
module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": "mysql"
};
*/
