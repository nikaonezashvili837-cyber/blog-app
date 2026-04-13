import { IncomingMessage, ServerResponse } from "node:http";
import http from 'http';
import { readFileSync } from "node:fs";
const data = readFileSync(`${process.cwd()}/data/data.json`,'utf-8');
const server:http.Server  = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
    const url:string | undefined = req.url;
    const method:string | undefined = req.method;
    if(url === '/posts' && method === 'GET'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(data)
    }
});

server.listen(3000);