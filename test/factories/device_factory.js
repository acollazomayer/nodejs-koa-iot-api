'use strict';

const factory = require('factory-girl').factory;
const DeviceModel = require('../../app/models/device');

const Device = 'device';

factory.define(Device, DeviceModel, {
  device_id: '123abc',
  name: 'somename',
});

module.exports = Device;
