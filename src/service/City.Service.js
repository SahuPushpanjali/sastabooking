const CityModel = require('./../model/City.Model')


async function CreateNewCityInDBService(name, image, description, cuisine){
 //It is Asynchronous task which retuns promise
 
 try {

        const result = await CityModel.create({
            name,
            image,
            description,
            cuisine
        })                                       
        
        if (result){
            return {
                success : true,
                data : result
            }
        }
        
        // console.log(result) ;

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}


async function GetAllCityFromDBService(){

    try{

        const result = await CityModel.find()

        if(result){
            return {
                success : true,
                data : result
        }
    }
    else{
        throw new Error("GetAllCityFromDBService is unable to get all city")
    }

    }catch(error){
        console.log(error)
        return {
            success : false

        }
        }
    }

module.exports ={
CreateNewCityInDBService,
GetAllCityFromDBService
}

