"use strict"

const express = require('express')
const seatpotsController = require('../controllers/seatpots')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/seatpots', seatpotsController.getAll)
app.get('/seatpots/:id', md_auth.ensureAuth, seatpotsController.getById)
app.post('/seatpots', md_auth.ensureAuth, seatpotsController.create)
app.put('/seatpots/:id', md_auth.ensureAuth, seatpotsController.update)
app.delete('/seatpots/:id', md_auth.ensureAuth, seatpotsController.destroy)

module.exports = app