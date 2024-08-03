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
        throw new Error("GetAllCityFromDBService is unable to get all cities")
    }

    }catch(error){
        console.log(error)
        return {
            success : false

        }
        }
}

async function UpdateCityInDBService(cityId, data){

    try{

        const {name, description, image, cuisines} = data;

        const cityDocument = await CityModel.findById(cityId)    //data is object here

           if(name){
            cityDocument.name = name
           }

           if (description){
            cityDocument.description = description
           }

        if(image){
            cityDocument.image = image
        }

        if(cuisines){
            cityDocument.cuisines = cuisines
        }

        const result = await cityDocument.save()
        
        if (result){

            return{
                success : true,
                data : result.data
            }
            
        }else{
            throw new Error(`UpdateCityInDBService unable to update the city with id : ${cityId}`)

        }

           
    }catch(error){
        console.log(error)
        return{
            success : false
        }
    }

}

async function DeleteCityInDBService(cityId){

    try{
        const result = await CityModel.findByIdAndDelete(cityId)

        if(result){
            return{
                success : true,
                data : result
            }
        }else{
            throw new Error("DeleteCityInDBService is unable to delete all cities")
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
GetAllCityFromDBService,
UpdateCityInDBService,
DeleteCityInDBService
}

