const express = require("express");

const { CreateNewCityController, GetAllCityController, UpdateCityController, DeleteCityController} = require("../controller/City.Controller");

const { AdminAuthorizationMiddleware} = require("./../middlewares/Authorization.middleware")

const CityRouter = express.Router();

// CityRouter.post("/add", ()=>{                    //it has access of req and response i.e, it is controller
//     CreateNewCityController                          //response.json works as response.end to end the request 
                   
//     })

CityRouter.post("/add",AdminAuthorizationMiddleware, CreateNewCityController)
CityRouter.get("/all", GetAllCityController)
CityRouter.put("/update",AdminAuthorizationMiddleware, UpdateCityController)
CityRouter.delete("/delete", DeleteCityController)


module.exports = CityRouter;  //exported the router 

