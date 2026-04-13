import { IncomingMessage, ServerResponse } from "node:http";
import http from 'http'
const server:http.Server  = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
    res.end('hello world')
});

server.listen(3000);