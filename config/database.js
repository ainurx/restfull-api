const mysql = require('mysql')
require('dotenv').config()

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

conn.connect(err=>{
  if(err) throw err
  console.log(`${process.env.DB_NAME} connected`)
})

module.exports = conn