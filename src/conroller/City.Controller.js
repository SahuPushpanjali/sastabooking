const {CreateNewCityInDBService, GetAllCityFromDBService} = require("./../service/City.Service")

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
            response.status(200).json({
                success : true,
                data : result.data
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
module.exports = {
    CreateNewCityController,
    GetAllCityController
}