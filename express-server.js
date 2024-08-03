const express = require("express")

require('dotenv').config()
require('./src/db/connect')

const  {RequestPathAndMethodLoggerMiddleware}  = require("./src/middlewares/Logger.middleware")

const CityRouter = require("./src/router/City.Router")

const AdventureDetailRouter = require("./src/router/AdventureDetail.Router")

const AdventureRouter = require("./src/router/Adventure.Router")

const AuthenticationRouter = require("./src/router/Authentication.Router")

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express()   // it makes a server for you
server.use(express.json())


server.use(RequestPathAndMethodLoggerMiddleware)

server.use("/adventures/detail", AdventureDetailRouter)

server.use("/adventures", AdventureRouter);

server.use("/cities", CityRouter);   //if request start from /cities then the request is handles by CityRouter

server.use("/auth", AuthenticationRouter);

server.use("*", (request, response)=>{
        response.json(404).json({
            success : false,
            message : "API ENDPOINT not found"
        })
})

server.listen(PORT, ()=>{

    console.log(`Server started successfully in ${NODE_ENV} at PORT - ${PORT}`)
})