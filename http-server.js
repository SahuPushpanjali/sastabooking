
const http = require("http");

const url = require("url")  //library

const PORT = 4000;

var DATABASE = [
    {
        id: 1,
        name: "Bhilai",
        place: 1
    },
    {
        id: 2,
        name: "Mumbai",
        place: 20
    },
    {
        id : 3,
        name : "Delhi",
        place : 15
    }

]

const serverhandler = (request, response) => {

    const { url: request_url, method } = request;     //we are getting the url and method

    const { pathname, query } = url.parse(request_url, true)

    console.log(request_url, pathname, query)

    if (pathname == "/cities" && method == "GET") {
        response.writeHead(200, { 'Content-Type': 'application/json' })

        const result = {
            success: true,
            message: DATABASE

        };

        response.end(JSON.stringify(result));

    } else if (pathname == "/cities/add" && method == "POST") {
        let body = ""

        request.on("data", (chunk) => {
            body += chunk.toString()
        })

        request.on("end", () => {

            const REQUEST_PAYLOAD = JSON.parse(body)
            console.log(REQUEST_PAYLOAD)

            const { name, place } = REQUEST_PAYLOAD
            DATABASE.push({

                id: DATABASE.length + 1,
                name,
                place
            })
            response.writeHead(200, { "Content-Type": "application/json" })

            response.end()
        })

    } else if (pathname == "/cities/update" && method == "PUT") {

const {id}=query
if(!id){
    response.writeHead(400,{ "Content-Type":"applicatin/json"})
    response.end(JSON.stringify({
       success:false,
       message:"id is missing in url"
    }))

}

let body=""

request.on("data", chunk=>{

    body += chunk.toString()
})
request.on("end",()=>{

    const REQUEST_PAYLOAD=JSON.parse(body)
    const {name, place} =REQUEST_PAYLOAD
    
    const cityIndex=DATABASE.findIndex(city=> {return city.id==id})
  
    let citydata=JSON.parse(JSON.stringify(DATABASE[cityIndex]))

    if(name) citydata.name=name;
    if(place) citydata.place=place;

    DATABASE.splice(cityIndex,1,citydata)

    response.writeHead(200,{"Content-Type":"appliction/json"})

    response.end(JSON.stringify({
        success:true
    }))
}
)
    } else if (pathname == "/cities/delete" && method == "DELETE") {


        const{id}= query;
        if(!id){

            response.writeHead(404,{ "Content-Type":"applicatin/json"})
            response.end(JSON.stringify({
              success:false,



            }))
        }
        const index=DATABASE.findIndex(element=>{ return element.id==id})
        DATABASE.splice(index,1);
        response.writeHead(200,{ "Content-Type":"applicatin/json"})
        response.end(JSON.stringify({
           success:false,
           message:"id is missing in url"
        }))
        }
       

    else {
        response.writeHead(404, { 'Content-Type': 'application/json' })
        const result = {
            success: false,
            message: "API NOT FOUND"

        };

        response.end(JSON.stringify(result));
    }

};

const server = http.createServer(serverhandler);

server.listen(PORT, () => {

    console.log("HTTP Server is running on port -", PORT)
})

