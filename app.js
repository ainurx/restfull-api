const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
require("dotenv").config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
  })
)

// app.set('trust proxy', 1) 
// app.use(session({
//   secret: process.env.JWT_KEY,
//   resave: false,
//   saveUninitialized: true,
//   cookie:{
//     secure: true,
//     maxAge: 100 * 60 * 60 * 24
//   }
// }))

app.get('/', (req, res)=>{
  res.send("<h1>HELLO WORLD</h1>")
})

const myApi = require('./app/routes/route')
app.use('/api', myApi)

app.listen(3000, ()=>{
  console.log('server is running ...')
})