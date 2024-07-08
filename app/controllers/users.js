"use strict"

const bcrypt = require('bcrypt')
const moment = require('moment')
const cloudinary = require('cloudinary').v2;

const mailer = require('../config/mail')
const jwt = require('../config/jwt')

const models = require('../models')
const User = models.User;

function getAll(req, res) {
  try{
    User.findAll({where: req.body}).then(users => {
      res.json(users)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function getById(req, res) {
  try{
    User.findByPk(req.params.id).then(user => {
      res.json(user)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try{
    let user = req.body
    let pass = user.password
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash
      User.create(user).then((user) => {
        let mailData = {email: user.email, password: pass, timestamp: moment().format('DD/MM/YYYY HH:mm:ss')}
        mailer.useTemplate(process.env.ADMIN_MAIL, 'New user account', mailData, 'newUser')
        res.json(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try{
    User.findByPk(req.params.id).then(user => {
      User.update(req.body, { where: { id: user.id }}).then(() => {
        res.status(400).send(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })  
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function destroy(req, res) {
  try{
    User.findByPk(req.params.id).then(user => {
      let id = user ? user.id : 0;
      User.destroy({ where: { id: user.id }}).then(() => {
        res.json(user)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })    
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function login(req, res) {
  try{
    User.findOne({where : { email: req.body.email }}).then(user => {
      if(user){
        bcrypt.compare(req.body.password, user.password, (err, check) => {
          if(check){
            res.json({ token: jwt.createToken(user), user: { id: user.id, email: user.email, name: user.name, surname: user.surname, role: user.role, image: user.image } })
          }else{
            res.status(401).send({error: true, message: 'Unauthorized'})
          }
        })
      }else{
        res.status(401).send({error: true, message: 'Unauthorized'})
      }
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function checkToken(req, res) {
  try {
    if(!req.headers.authorization){
      return res.status(403).send({error: true, message: 'Authorization header not found'})
    }
    var payload = jwt.decodeToken(req.headers.authorization)
    if(payload.exp <= moment().unix()){
      return res.status(401).send({error: true, message: 'Expired token'})
    }
    return res.status(200).send({
      error: false, 
      message: 'Valid token', 
      user: { 
        id: payload.id, 
        email: payload.email, 
        name: payload.name, 
        surname: payload.surname, 
        role: payload.role, 
        image: payload.image 
      }
    })
  } catch(err) {
    console.log(err)
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
    res.status(200).send({error: false, data: result.secure_url})
  }).end(req.file.buffer);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  login,
  checkToken,
  uploadImage
}