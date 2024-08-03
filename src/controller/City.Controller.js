const {CreateNewCityInDBService, GetAllCityFromDBService, UpdateCityInDBService, DeleteCityInDBService} = require("../service/City.Service")

async function CreateNewCityController(request, response){

    try{

        const {name, description, image, cuisines} = request.body

        const result = await CreateNewCityInDBService(name, description, image, cuisines)

        if(!result.success){
            throw new Error("CreateNewCityInDB failed to complete task")
        }
            response.status(201).json({
                success : true,
                data : request.data
            })
        

    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong"
        })

    }
}

async function GetAllCityController(request, response){

    try{

        const result = await GetAllCityFromDBService()

        if(result.success){

            const DATA = result.data.map((element)=>{                         //this is for remove   _id  
                const {_id, name, description, image, cuisines} = element
                return{

                    id : _id,
                    name,
                    description,
                    image,
                    cuisines
                }
            })
            response.status(200).json({                                //response.status(200).json
                success : true,                                        // success : true,
                data : DATA                                            //data : result.data
            })
        }else{
            throw new Error("GetAllCityFromDBService didn't give any city")
        }


    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }


}

async function UpdateCityController(request, response){

    try{


        const {id : cityId} = request.query

        const {name, description, image, cuisines} = request.body

        const DATA = {}

        if(name){
            DATA.name = name
        }

        if(description){
            DATA.description = description
        }

        if (image){
            DATA.image = image
        }

        if(cuisines){
            DATA.cuisines = cuisines
        }


        const result = await UpdateCityInDBService(cityId,DATA)

        if(result.success){
            response.status(200).json({                                //response.status(200).json
                success : true,                                        // success : true,
                data : DATA                                            //data : result.data
            })
        }else{
            throw new Error("UpdateCityInDBService didn't give result")
        }
    }catch(error){
        console.log(error)
        response.status(500).json({
            success : false,
            message : "Something went wrong"

        })
        }
}

async function DeleteCityController(request, response){

    try{

        const {id : cityId} = request.query

        const result = await DeleteCityInDBService(cityId)

        if(result){
            response.status(200).json({
                success : true,
                data : result
            })
        
        }else{
            throw new Error("DeleteAllCityInDBService didn't give result")
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
    CreateNewCityController,
    GetAllCityController,
    UpdateCityController,
    DeleteCityController
}