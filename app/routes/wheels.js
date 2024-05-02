"use strict"

const express = require('express')
const wheelsController = require('../controllers/wheels')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/wheels', wheelsController.getAll)
app.get('/wheels/:id', md_auth.ensureAuth, wheelsController.getById)
app.post('/wheels', md_auth.ensureAuth, wheelsController.create)
app.put('/wheels/:id', md_auth.ensureAuth, wheelsController.update)
app.delete('/wheels/:id', md_auth.ensureAuth, wheelsController.destroy)

module.exports = app