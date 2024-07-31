const UserModel = require("./../model/User.Model");

async function CreateNewUserInDBService(name, email, password, role){

    try{
        const result = await UserModel.create({
            name,
            email,
            password,
            role
        })

        if(result){
            return{
                success : true,
                data :result
            }

        }

    }catch(error){
        console.log(error)
        return {
            success : false

        }
    
    }
}
module.exports = {CreateNewUserInDBService}