"use strict"

const express = require('express')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const usersController = require('../controllers/users')

let app = express.Router()

let md_auth = require('../middleware/authenticate')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || '',
  api_key: process.env.CLOUDINARY_KEY || '',
  api_secret: process.env.CLOUDINARY_SECRET || ''
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/users', md_auth.ensureAuth, usersController.getAll)
app.get('/users/:id', md_auth.ensureAuth, usersController.getById)
app.post('/users', usersController.create)
app.put('/users/:id', md_auth.ensureAuth, usersController.update)
app.delete('/users/:id', md_auth.ensureAuth, usersController.destroy)
app.get('/checkToken', usersController.checkToken)
app.post('/uploadImage', upload.single('image'), usersController.uploadImage)


module.exports = app