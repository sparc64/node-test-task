'use strict';

const config = require('config');
const Message = require('../db/message');

function getHandler(res, pathname) {
  let route = pathname.slice(1).split("/");
  
  if (pathname === '/') {
      res.statusCode = 200;
      res.end(`Server listening on port ${config.get('port')}`);
  //} else if (pathname === '/messages') {
    // Return all messages
    
  } else if (route[0] === 'messages' && route.length === 2) {
    let messageId = route[1];
    
    Message
      .findOne({"_id": messageId})
      .then( (message) => {
        res.statusCode = 200;
        res.end(message.text + '\n');
      })
      .catch( (err) => {
        res.statusCode = 404;
        res.end("Message not found\n");
      });
  } else {
    res.statusCode = 501;
    res.end('Method not implemented\n');
  }
}

module.exports = getHandler;
