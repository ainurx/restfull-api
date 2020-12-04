const conn = require('../../config/database')

const table = 'artikel'

const Artikel = function(artikel){
  this.id_user = artikel.id_user
  this.judul = artikel.judul
  this.deskripsi = artikel.deskripsi
}

Artikel.findAll = result =>{
  conn.query(`SELECT * FROM ${table}`, (err, res)=>{
    if(err) result(err)
    result(res)
  })
}

Artikel.create = (newArtikel, result)=>{
  conn.query(`INSERT INTO ${table} SET ?`, newArtikel, (err, res)=>{
    if(err) result(err)
    result(res)
  })
}

module.exports = Artikel