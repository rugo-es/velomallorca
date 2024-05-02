"use strict"

const express = require('express')
const framesetsController = require('../controllers/framesets')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/framesets', framesetsController.getAll)
app.get('/framesets/:id', md_auth.ensureAuth, framesetsController.getById)
app.post('/framesets', md_auth.ensureAuth, framesetsController.create)
app.put('/framesets/:id', md_auth.ensureAuth, framesetsController.update)
app.delete('/framesets/:id', md_auth.ensureAuth, framesetsController.destroy)

module.exports = app