import { IncomingMessage, ServerResponse } from "node:http";
import http from 'http';
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync(`${process.cwd()}/data/data.json`,'utf-8'));
interface Post {
  id: number;
  post_author: string;
  post_content: string;
}
function findPost(id:number){
    return data.find((post:Post) => post.id === id)
}
const server:http.Server  = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
    const url:string | undefined = req.url;
    const method:string | undefined = req.method;
    let id:string | undefined;
    if(url) {
       id =  url.split('/')[2];
    }
    const post = findPost(Number(id));
    res.writeHead(200,{'Content-Type':'application/json'});
    if(url === '/posts' && method === 'GET'){
        return res.end(JSON.stringify({
            status:'ok',
            data
        }));
    }else if(post && method === 'GET'){
        return res.end(JSON.stringify({
            status:'ok',
            data:post
        }));
    }else if(Number(id) > data.length -1 ){
        return res.end(JSON.stringify({
            status:'404',
            data:'No data'
        }))
    }
});

server.listen(3000);