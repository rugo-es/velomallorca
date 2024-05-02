"use strict"

const models = require('../models')
const Seatpots = models.Seatpots;

function getAll(req, res) {
  try{
    Seatpots.findAll({where: req.body}).then(seatpots => {
      res.json(seatpots)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res) {
  try{
    Seatpots.findByPk(req.params.id).then(seatpots => {
      res.json(seatpots)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try {
    let seatpot = req.body
    Seatpots.create(seatpot).then((seatpot) => {
      res.json({message: 'Seatpot created', seatpot})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let seatpots = req.body
    Seatpots.create(seatpots).then((seatpots) => {
      res.json({message: 'Seatpots created', seatpots})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Seatpots.findByPk(req.params.id).then(seatpots => {
      Seatpots.update(req.body, { where: { id: seatpots.id }}).then(() => {
        res.json(seatpots)
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
    Seatpots.findByPk(req.params.id).then(seatpots => {
      let id = seatpots ? seatpots.id : 0;
      Seatpots.destroy({ where: { id }}).then(() => {
        res.json(seatpots)
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