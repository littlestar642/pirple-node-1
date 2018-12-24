// Primary File for API

// Instantiate all the constants. Require all the necessary API's
const http=require('http');
const https=require('https');
const url=require('url');
const config=require('./config');
const StringDecoder=require('string_decoder').StringDecoder;
const fs=require('fs');

// Function to instantiate the server

createUnifiedServer=(req,res)=>{
    // Variables to extract the required info from the request object
    let parsedUrl=url.parse(req.url,true);
    let path=parsedUrl.pathname;
    let trimmedPath=path.replace(/^\/+|\/+$/g,'')
    let queryStringObject=parsedUrl.query;
    let method=req.method.toLowerCase();
    let headers=req.headers;

    // Variable to decode the incoming stream
    let decoder=new StringDecoder('utf-8');
    let buffer='';

    // Event listener for ongoing data stream
    req.on('data',(data)=>{
        buffer+=decoder.write(data);
    })
    // Event listeners for end of data stream
    req.on('end',()=>{
        buffer+=decoder.end();

        // Choose the appropriate handle for the present route
        let chosenHandle=router[trimmedPath]!==undefined?router[trimmedPath]:handlers.notFound;
        
        // Form the data Object that is a collection of info from the request
        data={
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload:buffer
        }

        // Generate the Response
        chosenHandle(data,(statusCode,response)=>{
            statusCode=typeof(statusCode)==='number'?statusCode:200;
            response=typeof(response)==='object'?response:{};
            responseString=JSON.stringify(response);
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(responseString);
            console.log(data);

        })
    })
}

let options={
    key:fs.readFileSync('./https/key.pem'),
    cert:fs.readFileSync('./https/cert.pem')
}

// Create the http server
const httpServer=http.createServer(createUnifiedServer);
const httpsServer=https.createServer(options,createUnifiedServer);

// Start the server
httpServer.listen(config.httpPort,(req,res)=>{
    console.log(`Listening on ${config.httpPort}`);
});
httpsServer.listen(config.httpsPort,(req,res)=>{
    console.log(`Listening on ${config.httpsPort}`);
});



// Handler for route
let handlers={};

handlers.hello=(data,cb)=>{
    cb(200,{msg:'Hello I succeeded!'});
}
handlers.notFound=(data,cb)=>{
    cb(404);
}

// router object to set the correct handle for given route
let router={
    hello:handlers.hello
}
