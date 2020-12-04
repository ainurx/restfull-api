const express = require('express')
const router =express.Router()
const {body} = require('express-validator')

const userController = require('../controllers/user')
const artikelController = require('../controllers/artikel')

// USER ROUTE
router.get('/all-user', userController.findAll)
router.post('/create-user', [
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    body('nama').isLength({min: 5})
  ], userController.create
)
router.put('/update-user/:id', [
  body('username').isLength({ min: 5 }),
  body('password').isLength({ min: 5 }),
  body('nama').isLength({min: 5})
  ], userController.update
)
router.delete('/delete/:id', userController.delete)
router.post('/auth', [
  body('username').not().isEmpty(),
  body('password').not().isEmpty()
], userController.login)

//  ARTIKEL ROUTE
router.get('/all-artikel', artikelController.findAll)
router.post('/create-artikel',[
  body('judul').not().isEmpty(),
  body('deskripsi').not().isEmpty()
],
 artikelController.create)

module.exports = router