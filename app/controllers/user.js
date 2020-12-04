const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mySalt = bcrypt.genSaltSync(10)
const {validationResult, Result} = require('express-validator')
const jwt = require('jsonwebtoken')
const db = require('../../config/database')
const User = require('../models/user')
const { use } = require('../routes/route')

app.set('secret', 'ini rahasia')

exports.findAll = (req, res)=>{
  User.findAll((err, user)=>{
    err ? res.json({error: true, message: 'Oops'}) : res.json({error: false, data: user})
  })
}

exports.findById = (req, res)=>{
  User.findById(req.params.id, (err, user)=>{
    err ? res.json({error: true, message: 'Oops'}) : res.json({error: false, data: user})
  })
}

exports.create = (req, res)=>{
  const errors = validationResult(req)
  
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  else{
    const newUser = req.body
    bcrypt.hash(newUser.password, mySalt)
      .then(hash=>{
        newUser.password = hash
        User.create(newUser, (err, user)=>{
          if(err){
            res.send(err)
          }
          else{
            console.log("ini pass yang di hash: "+newUser.password)
            res.json({error: false, message: 'user created', data:user})
          }
        })
      })
      .catch(err=>console.log(err.message))
  }
}

exports.update = (req, res)=>{
  const errors = validationResult(req)
  
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  else{
    const newData = req.body

    newData.password = bcrypt.hashSync(newData.password, salt)
    User.update(req.params.id, newData, (err, user)=>{
      if(err){
        res.send(err)
      }
      else{
        res.json({error: false, message: 'user updated', data:user})
      }
    })
  }
}

exports.delete = (req, res)=>{
  User.delete(req.params.id, (err, user)=>{
    err ? res.json({error: true, message: 'Oops'}) : res.json({error: false, message: 'User terhapus'})
  })
}

exports.login = (req, res)=>{
  const errors = validationResult(req)
  
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  else{
    const userData = req.body

    User.login(userData, (err, user)=>{

      if(user.length < 1){
        res.json({
          message: 'Oops...username salah'
        })
      }
      else{
        console.log(user)
        const comparing = bcrypt.compareSync(userData.password, user[0].password)
        if(comparing){
          const token = jwt.sign({user}, app.get('secret'), {
            expiresIn: "24h"
          })
          res.json({
            error: false,
            message: "berhasil login",
            token: token
          })
        }
        else{
          res.json({
            error: true,
            message: "password salah"
          })
        }
      }
    }
  )}
}