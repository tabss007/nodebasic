const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const port = 3000; 
const server = http.createServer((req, res) => {
    
    //console.log(req.headers);
    //we get to know the data of who has sent the requests

    console.log('request for' +req.url + 'by method' + req.method); 
    //to check incoming req is coming from which url and from which method

    if(req.method == 'GET')
    {
        var fileURL;
        if(req.url == '/')
        {
            fileURL = "/index.html"
        }
        else
        { 
            fileURL = req.url
        }
        var filePath = path.resolve('./kapus' +fileURL);
        //path resolve makes an absolute path from start to end
        const fileExt = path.extname(filePath);
        if(fileExt == '.html')
        {
           fs.exists(filePath, (exists) =>{
            //to check if the file exists in our folder
            //call back fn which is run at the last
            if(!exists){
                  res.statusCode = 404;
                  res.setHeader('Content-Type','text/html');
                  res.end('<html><body><h1>error 404:' + fileURL+ 'does not exist </h1> </body> </html>');

            }
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            fs.createReadStream(filePath).pipe(res); 
            //a file path passed inside create read stream and then 
            //thru pipe a response is provided    
           }) 
          
        }
        else
        {
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>error 404:' + fileURL+ 'not a HTML file</h1> </body> </html>');

        }

    }else
    {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>error 404:' + fileURL+ 'file not supported</h1> </body> </html>');

    }

    //res.statusCode = 200;
    //if response status code is 200 it means
    //we received the req and we hv to convey them that we received it

    //res.setHeader('Conetent-Type','text/html');
    //res.end('<html><body><h1>Server connection successful</h1></body></html>')

});

//to call server
server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port}`);
});
