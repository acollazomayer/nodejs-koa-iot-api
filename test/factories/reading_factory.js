'use strict';

const factory = require('factory-girl').factory;
const ReadingModel = require('../../app/models/reading');

const Reading = 'reading';

factory.define(Reading, ReadingModel, {
  device_id: '125',
  used_memory_percentage: 4,
  cpu_load: 12,
  disk_usage_percentage: 213,
  cpu_temperature: 12,
  datetime: () => new Date(),
});

module.exports = Reading;
