const httpStatus = require('http-status')
const fs = require('fs')

async function RequestPathAndMethodLoggerMiddleware(request, response, next){
    try{
        const {method, path } = request

        console.log(method, path)

        const log = `Timesstamp : ${new Date()} - ${path} -${method}\n`
        
        fs.appendFileSync('request.log.txt', log, "utf8")

        next()
         
    }catch(error){
        console.log(error)
        response.status(err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR).json ({
            success : false,
            message : err.status ? err.status : "Something went wrong"
        })
    }

}

module.exports = {
    RequestPathAndMethodLoggerMiddleware
}