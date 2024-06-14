"use strict"

const models = require('../models')
const Frameset = models.Frameset;

function getAll(req, res) {
  try{
    Frameset.findAll({where: req.body}).then(framesets => {
      res.json(framesets)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function getById(req, res) {
  try{
    Frameset.findByPk(req.params.id).then(frameset => {
      res.json(frameset)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let frameset = req.body
    Frameset.create(frameset).then((frameset) => {
      res.json({message: 'Frameset created', frameset})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Frameset.findByPk(req.params.id).then(frameset => {
      Frameset.update(req.body, { where: { id: frameset.id }}).then(() => {
        res.json(frameset)
      }).catch(err => {
        console.log(err)
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })  
    }).catch(err => {
      console.log(err)
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch (err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function destroy(req, res) {
  try {
    Frameset.findByPk(req.params.id).then(frameset => {
      let id = frameset ? frameset.id : 0;
      Frameset.destroy({ where: { id }}).then(() => {
        res.json(frameset)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })    
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy
}