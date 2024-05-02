"use strict"

const express = require('express')
const appRoutesController = require('../controllers/app-routes')

let app = express.Router()

app.get('/framesets', appRoutesController.framesets)
app.get('/framesets/add', appRoutesController.framesetsAdd)
app.get('/framesets/edit/:id', appRoutesController.framesetsEdit)
app.get('/wheels', appRoutesController.wheels)
app.get('/wheels/add', appRoutesController.wheelsAdd)
app.get('/wheels/edit/:id', appRoutesController.wheelsEdit)
app.get('/tyres', appRoutesController.tyres)
app.get('/tyres/add', appRoutesController.tyresAdd)
app.get('/tyres/edit/:id', appRoutesController.tyresEdit)
app.get('/bars', appRoutesController.bars)
app.get('/bars/add', appRoutesController.barsAdd)
app.get('/bars/edit/:id', appRoutesController.barsEdit)
app.get('/seatpots', appRoutesController.seatpots)
app.get('/seatpots/add', appRoutesController.seatpotsAdd)
app.get('/seatpots/edit/:id', appRoutesController.seatpotsEdit)
app.get('/saddles', appRoutesController.saddles)
app.get('/saddles/add', appRoutesController.saddlesAdd)
app.get('/saddles/edit/:id', appRoutesController.saddlesEdit)

module.exports = app