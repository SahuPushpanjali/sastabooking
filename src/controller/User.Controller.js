const httpStatus = require('http-status')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const {CreateNewUserInDBService, GetUserByEmailFromDBService}  = require("./../service/User.Service");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function CreateNewUserController(request, response){

    try{

        const {name, email, password} = request.body

        if(!name || !email || !password){
            response.status(httpStatus.BAD_REQUEST).json({
                success : false,
                message : "Email, Name & Password is required"
            })
        }
        console.log(password)

        const SALT = bcrypt.genSaltSync(10)

        const encryptedPassword = bcrypt.hashSync(password, SALT)

        const result = await CreateNewUserInDBService(name, email, encryptedPassword)


        if(!result.success){
            throw new Error("Failed to create a new user")
        }
        response.status(201).json({
            result : true,
            message : "Userregistered successfully"
        })

    }catch(error){
        console.log(error)
        response.status(201).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

async function SigninUserController(request, response) {
    try{

        const {email, password} = request.body

        if(!email || !password){
            const error = new Error("Email & Password required")
            error.status = httpStatus.BAD_REQUEST
            throw error
        }

        //step 1 : we have to verify the user name and password
        const UserResult = await GetUserByEmailFromDBService(email)

        if(!UserResult.success){
            const error = new Error("Invalid Email or Password")
            error.status = httpStatus.BAD_REQUEST
            throw error
        }

        
        const {password : encryptedPassword, _id : userId} = UserResult.data

        //password check

        const PasswordCompareResult = bcrypt.compareSync(password, encryptedPassword)

        if (!PasswordCompareResult){
            const error = new Error("Invalid Email or Password")
            error.status = httpStatus.BAD_REQUEST
            throw error
        }

        // if(PasswordCompareResult){
        //     console.log("Password Success")
            
        // }else{
        //     console.log("Password Invalid")
        //     response.status(400).json({
        //         success : true,
        //     })
        // }

        //step 2 : we will generate the token and will send back to the client

const PAYLOAD = {
    userid : userId
}
  // we made token 

const token = jwt.sign(PAYLOAD, JWT_SECRET_KEY, {expiresIn : '1h'})

response.status(httpStatus.CREATED).json({
    success : true,
    token
})


    }catch(error){
        console.log(error)
        response.status(error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR).json({            //ternary operation condition
            success : false,
            message : error.status ? error.message : "Something went wrong"
        })

    }

}

module.exports = {
    CreateNewUserController,
    SigninUserController
}
