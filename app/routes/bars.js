"use strict"

const express = require('express')
const barsController = require('../controllers/bars')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/bars', barsController.getAll)
app.get('/bars/:id', md_auth.ensureAuth, barsController.getById)
app.post('/bars', md_auth.ensureAuth, barsController.create)
app.put('/bars/:id', md_auth.ensureAuth, barsController.update)
app.delete('/bars/:id', md_auth.ensureAuth, barsController.destroy)

module.exports = app