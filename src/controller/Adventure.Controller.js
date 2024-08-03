const httpStatus = require('http-status');

const { CreateNewAdventureInDBService, GetAllAdventuresInACityFromDBService, UpdateAdventureInDBService, DeleteAdventureInDBService } = require('./../service/Adventure.Service')

async function CreateNewAdventureController(request, response){
    try{
        
        const {cityid : cityId} = request.query;

        const { name, category, image, duration, pricePerHead} = request.body

        const result = await CreateNewAdventureInDBService(cityId, name, category, image, duration, pricePerHead)

        if(!result.success){
            throw new Error("CreateNewAdventureInDBService failed to complete task")
        }

            response.status(201).json({
                success : true,
                data : request.data
            })
        

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Error while creating new Adventure in collection"
        })
    }

 }

async function GetAllAdventuresController(request, response) {

    try{

        const {cityid : cityId} = request.query

        const result = await GetAllAdventuresInACityFromDBService(cityId)

        if(result.success){
            response.status(httpStatus.OK).json({
                success: true,
                data :  result.data
            })

        }else{
            throw new Error ("GetAllAdventuresInACityFromDBService didn't get adventures in a city " )
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Error while creating new Adventure in collection"
        })
    }
}

async function UpdateAdventureController(request, response){
  try{

    const {adventureid : adventureId} = request.query

     
    const {name, category, image, duartion, pricePerHead} = request.body
    
    
     const DATA = {}

     if(name){
        DATA.name = name
     }

     if(category){
        DATA.category = category
     }

     if(image){
        DATA.image = image
     }

     if(duartion){
        DATA.duration = duartion
     }

     if(pricePerHead){
        DATA.pricePerHead = pricePerHead
     }
     
     
     const result = await UpdateAdventureInDBService(adventureId, DATA)

     if(result.success){
        response.status(200).json({
            success : true,
            message : "updated successfully",
            data : result.data
        })
    }else{
        throw new Error ("UpdateAdventureInDBService didn't give result")
    }
  }catch(error){
    console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrrong"
        })
    }
}

async function DeleteAdventureController(request, response){
    try{

        const {adventureid : adventureId} = request.query

        const result = await DeleteAdventureInDBService(adventureId)

        if(result.success){
            response.status(200).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("DeleteAdventureInDBService didn't give result")
        }

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}
 module.exports = {
    CreateNewAdventureController,
    GetAllAdventuresController,
    UpdateAdventureController,
    DeleteAdventureController
 }

 
