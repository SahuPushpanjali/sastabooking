const { CreateNewAdventureDetailInDBService } = require("../service/AdventureDetail.Service")

const httpStatus = require("http-status")

async function CreateNewAdventureDetailController(request, response){
    try{

        const { adventureid : adventureId } = request.query

        const { subtitle, description, slots } = request.body

        const modifiedDateSlots = slots.map((element)=>{            //this code written because date is in form of string and we have to convert it into number format
           
            const [day, month, year] =  element.date.split("-").map(Number)       //it repesent array of string

           const date = new Date(Date.UTC(year, month-1, day))
           
           return {
            date,
            numberofPerson : element.numberofPerson
           }
        })

        const result = await CreateNewAdventureDetailInDBService(adventureId, subtitle, description, modifiedDateSlots)

        if(result.success){
            response.status(201).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("CreateNewAdventureDetailController unable to create new adventure detail")
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
    CreateNewAdventureDetailController
}