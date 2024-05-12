"use strict"

const models = require('../models')
const Groupsets = models.Groupsets;

function getAll(req, res) {
  try{
    Groupsets.findAll({where: req.body}).then(groupsets => {
      res.json(groupsets)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
  
}

function getById(req, res) {
  try{
    Groupsets.findByPk(req.params.id).then(groupset => {
      res.json(groupset)
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  }catch(err){
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function create(req, res) {
  try {
    let groupset = req.body
    Groupsets.create(groupset).then((groupset) => {
      res.json({message: 'Groupsets created', groupset})
    }).catch(err => {
      res.status(400).send({error: true, message: 'Bad Request', data: err.errors})
    })
  } catch(err) {
    res.status(500).send({error: true, message: 'Interval Server Error'})
  }
}

function update(req, res) {
  try {
    Groupsets.findByPk(req.params.id).then(groupset => {
      Groupsets.update(req.body, { where: { id: groupset.id }}).then(() => {
        res.json(groupset)
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
    Groupsets.findByPk(req.params.id).then(groupset => {
      let id = groupset ? groupset.id : 0;
      Groupsets.destroy({ where: { id }}).then(() => {
        res.json(groupset)
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