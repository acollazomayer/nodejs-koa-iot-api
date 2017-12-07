'use strict';

const url = require('../config/config').apiUrl;
const axios = require('axios');

/** Communication provides client communications services
 * @module lib/communication
 */

const RegistrationSuccesfullMessage = 'Registration Successful';
const DataAddedMessage = 'Data Uploaded Succesfully';

/** register registers a device in the database.
 * @param {String} deviceName
 */
async function register(deviceId, deviceName) {
  axios.post(`${url}/device/register`, {
    device_id: deviceId,
    name: deviceName,
  })
    .then(() => {
      console.log(RegistrationSuccesfullMessage);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

/** send sends the readings to the database.
* @param {object} data - contianing all the device readings.
*/
async function send(data) {
  axios.post(`${url}/readings/add`, data)
    .then(() => {
      console.log(DataAddedMessage);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

module.exports = {
  register,
  send,
};
