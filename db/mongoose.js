'use strict';

const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
//mongoose.set('debug', true);

mongoose.connect(`mongodb://${config.get('dbUser')}:${config.get('dbPassword')}@ds133981.mlab.com:33981/${config.get('db')}`);

// From Mongoose docs
let db = mongoose.connection;
//Ingenious, but I don't like - too complex and not straightforward. Error object printed from nowhere.
//db.on('error', console.error.bind(console, 'connection error:'));
db.on('error', (err) => {
  console.error('connection error:\n', err);
});
db.once('open', () => {
  console.log("successfully connected to db");
});

module.exports = mongoose;
