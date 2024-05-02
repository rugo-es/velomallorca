"use strict"

const models = require('../models')
const Bars = models.Bars;

function getAll(req, res) {
  try{
    Bars.findAll({where: req.body}).then(bars => {
      res.json(bars)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function getById(req, res) {
  try{
    Bars.findByPk(req.params.id).then(bars => {
      res.json(bars)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res){
  try {
    let bar = req.body
    Bars.create(bar).then((bar) => {
      res.json({message: 'Bar created', bar})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let bars = req.body
    Bars.create(bars).then((bars) => {
      res.json({message: 'Bars created', bars})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Bars.findByPk(req.params.id).then(bars => {
      Bars.update(req.body, { where: { id: bars.id }}).then(() => {
        res.json(bars)
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
    Bars.findByPk(req.params.id).then(bars => {
      let id = bars ? bars.id : 0;
      Bars.destroy({ where: { id }}).then(() => {
        res.json(bars)
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