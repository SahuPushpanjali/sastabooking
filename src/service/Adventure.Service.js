const AdventureModel = require('./../model/Adventure.Model')

async function CreateNewAdventureInDBService(cityId, name, category, image, duration, pricePerHead ){
  try{

    const result = await AdventureModel.create({
        cityId,
        name,
        category,
        image,
        duration,
        pricePerHead
    })

    if(result){
        return {
            success : true,
            data : result
        }
    }else {
        throw new Error("CreateNewAdventureInDBService unable to create new Adventure ")
    }

  }catch(error){
    console.log(error)
    return { 
        success : false 
    }
  }
}

async function GetAllAdventuresInACityFromDBService(cityId){
    try{

        const result = await AdventureModel.find({
            cityId 
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("GetAllAdventuresInACityFromDBService unable to get adventure city")
        }

    }catch(error){
        console.log(error)
        return{
            success : false
        }
    }
}

async function UpdateAdventureInDBService(adventureId, DATA){
    try{

    const {name, category, image, duration, pricePerHead } = DATA

        const adventureDocument = await AdventureModel.findById(adventureId)
   
   
        if (name) {
            adventureDocument.name = name
            
        }
        if (category) {
            adventureDocument.category = category
        }
        if (image) {
            adventureDocument.image = image
        }
        if (duration) {
            adventureDocument.duration = duration 
        }
        if (pricePerHead) {
            adventureDocument.pricePerHead = pricePerHead
        }
    
    
    const result = await adventureDocument.save()

    if(result){
        return{
            success : true,
            data : result
        }
    }else{
        throw new Error("UpdateAdventureInDBService is unable to update adventure ")
    }

    }catch(error){
        console.log(error)
        return{
            success : false
        }
    }
} 

async function DeleteAdventureInDBService(adventureId){
    try{
        

        const result = await AdventureModel.findByIdAndDelete(adventureId)

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error(`DeleteAdventureInDBService is unable to delete adventure ${adventureId}`)
        }

    }catch(error){
        console.log(error)
        return {
            success : false
        }
    }
}

module.exports = {
    CreateNewAdventureInDBService,
    GetAllAdventuresInACityFromDBService,
    UpdateAdventureInDBService,
    DeleteAdventureInDBService
}