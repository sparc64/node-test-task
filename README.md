Message Storage Service [Node.js]
=================================
### Specification

simple web service which allows users to store and retrieve plain text messages.
The service should behave as follows:
```
$ curl $domain/messages/ -d 'my test message to store'
{"id":12345}

$ curl $domain/messages/12345
my test message to store
```

=================================
### Comments

- I didn't use Koa / Express frameworks intentionally to show how I can deal with default node.js environment.
- To run tests execute 'npm test' in terminal.

=================================
### Features
- Simple Get / Post +
- Message length limit +
- Database as storage +
- Code refactoring (move functionality to separate files) +
- config module +
- Tests +
- Proper error handling +
- Root page for GET / + (just plain text for now)
- Http headers (Content-type, utf8) +
- mongoose-sequence for auto-increment id to avoid usage of internal Mongo ID ?
- Correct server exit with db disconnect ?
- Message Delete ?
- Get all messages ?
- Config file for test env. and separate db

=================================
