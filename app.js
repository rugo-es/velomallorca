"use strict"

require('dotenv').config(); 
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mustacheExpress = require('mustache-express')
// const morgan = require('morgan')
// const fs = require('fs')
// const moment = require('moment')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/app/views'))
app.set('partials', path.join(__dirname, '/app/views/partials'))
/*
app.use(morgan('[:date[clf]] :method ":url" :status', {
  stream: fs.createWriteStream(path.join(__dirname, 'app/log/access_'+moment().format('YYYYMMDD')+'.log'), { flags: 'a' })
}))
app.use(morgan('dev'))
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/css', express.static(path.join(__dirname, 'app/assets/css')))
app.use('/js', express.static(path.join(__dirname, 'app/assets/js')))
app.use('/img', express.static(path.join(__dirname, 'app/assets/img')))
app.use('/json', express.static(path.join(__dirname, 'app/assets/json')))

const mainRoutes = require(path.join(__dirname, 'app/routes/main-routes'))
app.use(mainRoutes)

const appRoutes = require(path.join(__dirname, 'app/routes/app-routes'))
app.use('/app', appRoutes)

const usersRoutes = require(path.join(__dirname, 'app/routes/users'))
const framesetsRoutes = require(path.join(__dirname, 'app/routes/framesets'))
const groupsetsRoutes = require(path.join(__dirname, 'app/routes/groupsets'))
const wheelsRoutes = require(path.join(__dirname, 'app/routes/wheels'))
const tyresRoutes = require(path.join(__dirname, 'app/routes/tyres'))
const barsRoutes = require(path.join(__dirname, 'app/routes/bars'))
const seatpotsRoutes = require(path.join(__dirname, 'app/routes/seatpots'))
const saddlesRoutes = require(path.join(__dirname, 'app/routes/saddles'))
app.use('/api', usersRoutes)
app.use('/api', framesetsRoutes)
app.use('/api', groupsetsRoutes)
app.use('/api', wheelsRoutes)
app.use('/api', tyresRoutes)
app.use('/api', barsRoutes)
app.use('/api', seatpotsRoutes)
app.use('/api', saddlesRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost: ${port}`)
})
