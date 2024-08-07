"use strict"

const cdn = require('../config/cdn')

function framesets(req, res){
  res.render('framesets', {
    title: 'Frameset', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/framesets/framesets.js',
      '/js/app.js' 
    ]
  })
}

function framesetsAdd(req, res){
  res.render('framesetsAdd', {
    title: 'Frameset', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/framesets/framesetsCommon.js',
      '/js/framesets/framesetsAdd.js',
      '/js/app.js' 
    ]
  })
}

function framesetsEdit(req, res) {
  res.render('framesetsEdit', {
    title: 'Frameset', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/framesets/framesetsCommon.js',
      '/js/framesets/framesetsEdit.js',
      '/js/app.js' 
    ],
  })
}

function groupsets(req, res){
  res.render('groupsets', {
    title: 'Groupsets', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/groupsets/groupsets.js',
      '/js/app.js' 
    ]
  })
}

function groupsetsAdd(req, res){
  res.render('groupsetsAdd', {
    title: 'Groupsets', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/groupsets/groupsetsCommon.js',
      '/js/groupsets/groupsetsAdd.js',
      '/js/app.js' 
    ]
  })
}

function groupsetsEdit(req, res) {
  res.render('groupsetsEdit', {
    title: 'Groupsets', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/groupsets/groupsetsCommon.js',
      '/js/groupsets/groupsetsEdit.js',
      '/js/app.js' 
    ],
  })
}

function wheels(req, res){
  res.render('wheels', {
    title: 'Wheels', 
    nav: true,
    mainClass: 'container mt-5 pt-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/wheels/wheels.js',
      '/js/app.js' 
    ]
  })
}

function wheelsAdd(req, res){
  res.render('wheelsAdd', {
    title: 'Wheels', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/wheels/wheelsCommon.js',
      '/js/wheels/wheelsAdd.js',
      '/js/app.js' 
    ]
  })
}

function wheelsEdit(req, res) {
  res.render('wheelsEdit', {
    title: 'Wheels', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/wheels/wheelsCommon.js',
      '/js/wheels/wheelsEdit.js',
      '/js/app.js' 
    ],
  })
}

function tyres(req, res){
  res.render('tyres', {
    title: 'Tyres', 
    nav: true,
    mainClass: 'container mt-5 pt-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/tyres/tyres.js',
      '/js/app.js' 
    ]
  })
}

function tyresAdd(req, res){
  res.render('tyresAdd', {
    title: 'tyres', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/tyres/tyresCommon.js',
      '/js/tyres/tyresAdd.js',
      '/js/app.js' 
    ]
  })
}

function tyresEdit(req, res) {
  res.render('tyresEdit', {
    title: 'Tyres', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/tyres/tyresCommon.js',
      '/js/tyres/tyresEdit.js',
      '/js/app.js' 
    ],
  })
}

function bars(req, res){
  res.render('bars', {
    title: 'Bars', 
    nav: true,
    mainClass: 'container mt-5 pt-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/bars/bars.js',
      '/js/app.js' 
    ]
  })
}

function barsAdd(req, res){
  res.render('barsAdd', {
    title: 'bars', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/bars/barsCommon.js',
      '/js/bars/barsAdd.js',
      '/js/app.js' 
    ]
  })
}

function barsEdit(req, res) {
  res.render('barsEdit', {
    title: 'Bars', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/bars/barsCommon.js',
      '/js/bars/barsEdit.js',
      '/js/app.js' 
    ],
  })
}

function seatpots(req, res){
  res.render('seatpots', {
    title: 'Seatpots', 
    nav: true,
    mainClass: 'container mt-5 pt-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/seatpots/seatpots.js',
      '/js/app.js' 
    ]
  })
}

function seatpotsAdd(req, res){
  res.render('seatpotsAdd', {
    title: 'Seatpots', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/seatpots/seatpotsCommon.js',
      '/js/seatpots/seatpotsAdd.js',
      '/js/app.js' 
    ]
  })
}

function seatpotsEdit(req, res) {
  res.render('seatpotsEdit', {
    title: 'Seatpots', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/seatpots/seatpotsCommon.js',
      '/js/seatpots/seatpotsEdit.js',
      '/js/app.js' 
    ],
  })
}

function saddles(req, res){
  res.render('saddles', {
    title: 'Saddles', 
    nav: true,
    mainClass: 'container mt-5 pt-5',
    css: [
      cdn.css.bootswatch.lux, 
      cdn.css.datatable,
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      cdn.js.datatable,
      cdn.js.datatableBootstrap,
      '/js/saddles/saddles.js',
      '/js/app.js' 
    ]
  })
}

function saddlesAdd(req, res){
  res.render('saddlesAdd', {
    title: 'Saddles', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/saddles/saddlesCommon.js',
      '/js/saddles/saddlesAdd.js',
      '/js/app.js' 
    ]
  })
}

function saddlesEdit(req, res) {
  res.render('saddlesEdit', {
    title: 'Saddles', 
    nav: true,
    mainClass: 'container mt-5 mb-3 py-5',
    css: [
      cdn.css.bootswatch.lux, 
      '/css/style.css'
    ],
    scripts: [
      cdn.js.jquery,  
      cdn.js.bootstrap.bundle, 
      '/js/alerts.js',
      '/js/saddles/saddlesCommon.js',
      '/js/saddles/saddlesEdit.js',
      '/js/app.js' 
    ],
  })
}

module.exports = {
  framesets,
  framesetsAdd,
  framesetsEdit,
  groupsets,
  groupsetsAdd,
  groupsetsEdit,
  wheels,
  wheelsAdd,
  wheelsEdit,
  tyres,
  tyresAdd,
  tyresEdit,
  bars,
  barsAdd,
  barsEdit,
  seatpots,
  seatpotsAdd,
  seatpotsEdit,
  saddles,
  saddlesAdd,
  saddlesEdit
}