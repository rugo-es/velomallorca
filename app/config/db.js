"use strict"

require('dotenv').config(); 

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": "mysql"
};

/*
module.exports =  {
  url: "postgresql://test:wcaJ2rKmlfxp28t-zBLcrg@test-cluster-1692.j77.cockroachlabs.cloud:26257/test_velomallorca?sslmode=verify-full",
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
}
*/
