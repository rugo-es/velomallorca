"use strict"

const express = require('express')
const tyresController = require('../controllers/tyres')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/tyres', tyresController.getAll)
app.get('/tyres/:id', md_auth.ensureAuth, tyresController.getById)
app.post('/tyres', md_auth.ensureAuth, tyresController.create)
app.put('/tyres/:id', md_auth.ensureAuth, tyresController.update)
app.delete('/tyres/:id', md_auth.ensureAuth, tyresController.destroy)

module.exports = app