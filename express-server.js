const express = require("express")

// const { CreateNewCityInDBService } =require ("./src/service/City.Service")
// const { CreateNewUserInDBService } = require ("./src/service/User.Service")

require('dotenv').config()
require('./src/db/connect')

const CityRouter = require("./src/router/City.Router");

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express()   // it makes a server for you
server.use(express.json())

server.use("/cities", CityRouter);   //if request start from /cities then the request is handles by CityRouter

// CreateNewCityInDBService  ("Raipur", "http://images.com/img1.png", "100 + places") 
// CreateNewUserInDBService ("Anjali", "pushpanjali@gmail.com", "abcd", "customer")


server.listen(PORT, ()=>{

    console.log(`Server started successfully in ${NODE_ENV} at PORT - ${PORT}`)
})