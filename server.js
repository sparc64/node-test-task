'use strict';

const http = require('http');
const url = require('url');
const Message = require('./db/message'); 
const getHandler = require('./handlers/get');
const postHandler = require('./handlers/post');

module.exports = http.createServer( (req, res) => {
  let pathname = decodeURI(url.parse(req.url).pathname);
  
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  
  switch(req.method) {
  case 'GET':
    getHandler(res, pathname);
    break;
    
  case 'POST':
    postHandler(req, res, pathname);
    break;
    
  default:
    res.statusCode = 501;
    res.end('Method not implemented\n');
  }
});
