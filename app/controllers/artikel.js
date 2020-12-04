const Artikel = require('../models/artikel')

exports.findAll = (req, res)=>{
  Artikel.findAll((err, artikel)=>{
    if(err){
      res.status(400).json({  
        error: true,
        message: 'Oops'
      })
    }
    else{
      res.json({
        error: false,
        data: artikel
      })
    }
  })
}

exports.create = (req, res)=>{
  if(sfasfs){

  }
  else{
    const newArtikel = req.body
    Artikel.create(newArtikel, (err, artikel)=>{
      res.json({
        error: false,
        message: 'Artikel ditambahkan',
        data: artikel
      })
    })
  }
}