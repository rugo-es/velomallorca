"use strict"

const models = require('../models')
const Wheels = models.Wheels;

function getAll(req, res) {
  try{
    Wheels.findAll({where: req.body}).then(wheels => {
      res.json(wheels)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res) {
  try{
    Wheels.findByPk(req.params.id).then(wheels => {
      res.json(wheels)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try {
    let wheel = req.body
    Wheels.create(wheel).then((wheel) => {
      res.json({message: 'Wheel created', wheel})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let wheels = req.body
    Wheels.create(wheels).then((wheels) => {
      res.json({message: 'Wheels created', wheels})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Wheels.findByPk(req.params.id).then(wheels => {
      Wheels.update(req.body, { where: { id: wheels.id }}).then(() => {
        res.json(wheels)
      }).catch(err => {
        res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
      })  
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch (err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function destroy(req, res) {
  try {
    Wheels.findByPk(req.params.id).then(wheels => {
      let id = wheels ? wheels.id : 0;
      Wheels.destroy({ where: { id }}).then(() => {
        res.json(wheels)
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