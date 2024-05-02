"use strict"

const models = require('../models')
const Tyres = models.Tyres;

function getAll(req, res) {
  try{
    Tyres.findAll({where: req.body}).then(tyres => {
      res.json(tyres)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res) {
  try{
    Tyres.findByPk(req.params.id).then(tyres => {
      res.json(tyres)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try {
    let tyre = req.body
    Tyres.create(tyre).then((tyre) => {
      res.json({message: 'Tyres created', tyre})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let tyres = req.body
    Tyres.create(tyres).then((tyres) => {
      res.json({message: 'Tyres created', tyres})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Tyres.findByPk(req.params.id).then(tyres => {
      Tyres.update(req.body, { where: { id: tyres.id }}).then(() => {
        res.json(tyres)
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
    Tyres.findByPk(req.params.id).then(tyres => {
      let id = tyres ? tyres.id : 0;
      Tyres.destroy({ where: { id }}).then(() => {
        res.json(tyres)
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