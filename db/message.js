'use strict';

const config = require('config');
const mongoose = require('./mongoose.js');

const messageSchema = new mongoose.Schema({
  text: {
    type:       String,
    required:   'Message text can not be empty',
    validate: [{
      validator: function checkMessageLength(text) {
        return text.length <= config.get('messageLengthLimit');
      },
      msg: `Message is too long. Length limit is ${config.get('messageLengthLimit')}`
    }],
    trim: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema); 
