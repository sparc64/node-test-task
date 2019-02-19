'use strict';

console.log(`Environment: ${process.env.NODE_ENV}`);

const assert = require('assert');
const config = require('config');
const request = require('request');

const server = require('../server');

const host = 'http://127.0.0.1:3000';

let testMessage = 'Mocha Test Message';
let tempTestMessage = '';
let messageId = null;

describe('SERVER', () => {
  before(done => {
    server.listen(3000, '127.0.0.1');
    setTimeout(done, 5000); // Waiting to connect to db; Temporary solution
  });

  after(done => {
    server.close(done);
  });
  
  describe('General test', (done) => {
    it('Response Content-Type is "text/plain; charset=UTF-8"', (done) => {
      request.get(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.headers['content-type'], 'text/plain; charset=UTF-8');
        done();
      });
    });
  });
  
  describe('POST', () => {
    it('root / status code = 400', (done) => {
      request.post({url: `${host}/`, body: testMessage}, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 400);
        done();
      });
    });
    
    it('Nested path returns 400', (done) => {
      request.post({url: `${host}/messages/nested/`, body: testMessage}, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 400);
        done();
      });
    });
    
    
    it('Saving valid message to /messages/ returns 200', (done) => {
      request.post({url: `${host}/messages/`, body: testMessage}, (error, response, body) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    
    it('Saving too long message to /messages/ returns 413', (done) => {
      let tooLongMessage = new Array( config.get('messageLengthLimit') + 2 ).join('m');
      request.post({url: `${host}/messages/`, body: tooLongMessage}, (error, response, body) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 413);
        done();
      });
    });
    
    // Not implemented in code
    it.skip('Saving empty message to /messages/ returns 413', (done) => {
      request.post({url: `${host}/messages/`, body: undefined}, (error, response, body) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 413);
        done();
      });
    });
  });
  
  describe('GET', () => {
    it('root / status code = 200', (done) => {
      request.get(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
    
    context('Message exist', () => {
      before( (done) => {
        tempTestMessage = 'Mocha Test ' + Math.random().toString().slice(2,7);
        request.post({url: `${host}/messages/`, body: tempTestMessage}, (error, response, body) => {
          if (error) return done(error);
          try {
            messageId = JSON.parse(body).id;
          } catch(e) {
            return done(e);
          }
          done();
        });
      });
      
      it('Status code = 200', (done) => {
        request.get(`${host}/messages/${messageId}`, (error, response) => {
          if (error) return done(error);
          assert.equal(response.statusCode, 200);
          done();
        });
      });
      
      it('Saved and returned values are same', (done) => {
        request.get(`${host}/messages/${messageId}`, (error, response, body) => {
          if (error) return done(error);
          assert.equal(body.trim(), tempTestMessage);
          done();
        });
      });
    });
    
    context('Message does NOT exist', () => {
      it('Status code = 404', (done) => {
        request.get(`${host}/messages/xyz123`, (error, response) => {
          if (error) return done(error);
          assert.equal(response.statusCode, 404);
          done();
        });
      });
    });
  });
  
  describe('OTHER (not implemented)', (done) => {
    it('PUT status code = 501', (done) => {
      request.put(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 501);
        done();
      });
    });
    it('DELETE status code = 501', (done) => {
      request.delete(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 501);
        done();
      });
    });
    it('HEAD status code = 501', (done) => {
      request.head(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 501);
        done();
      });
    });
    it('PATCH status code = 501', (done) => {
      request.patch(`${host}/`, (error, response) => {
        if (error) return done(error);
        assert.equal(response.statusCode, 501);
        done();
      });
    });
  });
});
