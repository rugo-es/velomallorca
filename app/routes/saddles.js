"use strict"

const express = require('express')
const saddlesController = require('../controllers/saddles')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/saddles', saddlesController.getAll)
app.get('/saddles/:id', md_auth.ensureAuth, saddlesController.getById)
app.post('/saddles', md_auth.ensureAuth, saddlesController.create)
app.put('/saddles/:id', md_auth.ensureAuth, saddlesController.update)
app.delete('/saddles/:id', md_auth.ensureAuth, saddlesController.destroy)

module.exports = app