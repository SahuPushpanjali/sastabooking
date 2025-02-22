const httpStatus = require('http-status')
const {GetUserByUserIdFromDBService} = require('../service/User.Service')
const jwt = require("jsonwebtoken")

require("dotenv").config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function AdminAuthorizationMiddleware(request, response, next) {
    try{

        const token = request.headers.authorization.split(" ")[1]

        const payload = jwt.verify(token, JWT_SECRET_KEY)

        const {userid : userId} = payload

        const result = await GetUserByUserIdFromDBService(userId)

        if(!result.success){
            throw new Error()
        }

        const {role} = result.data

        if(role==="admin"){
            request.userId = userId

            next()
        }else{
            throw new Error()
        }

    }catch(err){
        console.log(err)
        response.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : err.status ? err.message : "Something went to wrong"
        })
    }
}

async function CustomerAuthorizationMiddleware(request, response, next) {
    try{

        const token = request.headers.authorization.split(" ")[1]

        const payload = jwt.verify(token, JWT_SECRET_KEY)

        const {userid : userId} = payload

        const result = await GetUserByUserIdFromDBService(userId)

        if(!result.success){
            throw new Error()
        }

        const {role} = result.data

        if(role==="customer"){
            request.userId = userId

            next()
        }else{
            throw new Error()
        }

    }catch(err){
        console.log(err)
        response.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message : err.status ? err.message : "Something went to wrong"
        })
    }
}



module.exports = {
    AdminAuthorizationMiddleware,
    CustomerAuthorizationMiddleware
}





