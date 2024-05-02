"use strict"

const models = require('../models')
const Saddle = models.Saddle;

function getAll(req, res) {
  try{
    Saddle.findAll({where: req.body}).then(saddles => {
      res.json(saddles)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res) {
  try{
    Saddle.findByPk(req.params.id).then(saddles => {
      res.json(saddles)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try {
    let saddle = req.body
    Saddle.create(saddle).then((saddle) => {
      res.json({message: 'Saddle created', saddle})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let saddles = req.body
    Saddle.create(saddles).then((saddle) => {
      res.json({message: 'Saddle created', saddle})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Saddle.findByPk(req.params.id).then(saddles => {
      Saddle.update(req.body, { where: { id: saddles.id }}).then(() => {
        res.json(saddles)
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
    Saddle.findByPk(req.params.id).then(saddles => {
      let id = saddles ? saddles.id : 0;
      Saddle.destroy({ where: { id }}).then(() => {
        res.json(saddles)
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