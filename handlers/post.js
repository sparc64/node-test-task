'use strict';

const config = require('config');
const Message = require('../db/message');

function postHandler(req, res, pathname) {
  if (pathname === '/messages/' || pathname === '/messages') {
    let body = '';
    req.setEncoding('utf-8');
    
    req.on('data', data => {
      body += data;
  
      if (body.length > config.get('messageLengthLimit')) {
        body = undefined;
        res.statusCode = 413;
        res.end('Your message is too long\n');
      }
    });
    
    req.on('end', () => {
      try {
        body = body.toString();
      } catch (e) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
      }
     
      Message
        .create({"text": body})
        .then( (message) => {
          res.statusCode = 200;
          res.end(`{"id":"${message.id}"}\n`);
        })
        .catch( () => {
          res.statusCode = 500;
          res.end('Error saving into database\n');  
        });
    });
  } else {
   res.statusCode = 400;
   res.end('Bad Request\n');  
  }
}

module.exports = postHandler;
