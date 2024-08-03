const express = require("express");

    const {CreateNewAdventureController, GetAllAdventuresController, UpdateAdventureController, DeleteAdventureController} = require("./../controller/Adventure.Controller");

    const {AdminAuthorizationMiddleware } = require("./../middlewares/Authorization.middleware")

    const AdventureRouter = express.Router();

    AdventureRouter.post("/add",AdminAuthorizationMiddleware, CreateNewAdventureController)
    AdventureRouter.get("/all", GetAllAdventuresController)
    AdventureRouter.put("/update", UpdateAdventureController)
    AdventureRouter.delete("/delete", DeleteAdventureController)

    module.exports = AdventureRouter;






    


