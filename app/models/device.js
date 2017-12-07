'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Device', schema);
