'use strict';

const Device = require('../models/device');
const translate = require('counterpart');
const constants = require('../constants/constants');

translate.registerTranslations('en', require('../../locales/en.json'));

/** Device repo provides device related database services
 * @module repos/device_repo
 */

/** deviceExists checks if the device is already registered
 * in the database or not.
 * @param {String} deviceId - the id of the device.
 * @return {Boolean} true for confirmed existance and false for not.
 */
async function deviceExists(deviceId) {
  const device = await Device.find({ device_id: deviceId });
  return device.length > 0;
}

/** deviceAdd creates a device in the database.
 * @param {Object} device - Object containing all the fields of a device.
 * @return {Promise} resolving the device or rejecting errors.
 */
async function deviceAdd(device) {
  if (await deviceExists(device.device_id)) {
    const error = { code: constants.EntryAlreadyExistsCode, message: translate('DeviceInDatabaseError') };
    return Promise.reject(error);
  }
  return Device.create(device);
}

module.exports = {
  add: deviceAdd,
};
