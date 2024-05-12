"use strict"

const express = require('express')
const groupsetsController = require('../controllers/groupsets')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

app.get('/groupsets', groupsetsController.getAll)
app.get('/groupsets/:id', md_auth.ensureAuth, groupsetsController.getById)
app.post('/groupsets', md_auth.ensureAuth, groupsetsController.create)
app.put('/groupsets/:id', md_auth.ensureAuth, groupsetsController.update)
app.delete('/groupsets/:id', md_auth.ensureAuth, groupsetsController.destroy)

module.exports = app