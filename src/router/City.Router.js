const express = require("express");

const { CreateNewCityController, GetAllCityController } = require("../conroller/City.Controller");

const CityRouter = express.Router();

// CityRouter.post("/add", ()=>{                    //it has access of req and response i.e, it is controller
//     CreateNewCityController                          //response.json works as response.end to end the request 
                   
//     })

CityRouter.post("/add", CreateNewCityController)
CityRouter.get("/all", GetAllCityController)


module.exports = CityRouter;  //exported the router 

