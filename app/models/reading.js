'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
  },
  used_memory_percentage: {
    type: Number,
    required: true,
  },
  cpu_load: {
    type: Number,
    required: true,
  },
  disk_usage_percentage: {
    type: Number,
    required: true,
  },
  cpu_temperature: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Reading', schema);
