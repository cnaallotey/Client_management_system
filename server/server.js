//installing Dependencies
const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

//importing json
let data = require('./client.json')

//running express
const app = express()

//using cors
app.use(cors())

//configuring body parser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//import get routes
const getRoutes = require('./gets')
app.use('/', getRoutes)

//import post routes
const postRoutes = require('./posts')
app.use('/', postRoutes)

//import delete routes
const deleteRoutes = require('./deletes')
app.use('/', deleteRoutes)


//importing put routes
const updateRoutes = require('./puts')
app.use('/', updateRoutes)

app.use('/server/', serveStatic(path.join(__dirname, '/dist')))



const port = process.env.port || 3000

app.listen(port, ()=> {
    console.log(`App is running on ${port}`);
})