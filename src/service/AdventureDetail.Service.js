const AdventureDetailModel= require("./../model/AdventureDetail.Model")

async function CreateNewAdventureDetailInDBService(adventureId, subtitle, description, slots){
    try {


    const result = await AdventureDetailModel.create({
        adventureId,
        subtitle,
        description,
        slots
    })

    if(result){
        return {
            success : true,
            data : result
        }
    }else{
        throw new Error("CreateNewAdventureDetailInDBService unable to create new adventure details")
    }

    }catch(error){
        console.log(error)
        return {
            success : false
            }
        }
    }

    module.exports = {
        CreateNewAdventureDetailInDBService
    }



