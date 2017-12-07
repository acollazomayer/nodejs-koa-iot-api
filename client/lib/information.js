'use strict';

const systemInfo = require('systeminformation');

/** Information provides client information related services
 * @module lib/information
 */

/** calcPercentage calculates the percentage of a value respect of a maximum.
 * @param {Number} value - value input to find its percentage.
 * @param {Number} max - maximum value that corresponds to 100%.
 * @return {Number} percentage of the value.
 */
function calcPercentage(value, max) {
  return (value * 100) / max;
}

/** gather collects all the device data.
* @return {Object} containing the devices data.
*/
async function gather() {
  const system = await systemInfo.system();
  const memory = await systemInfo.mem();
  const cpuLoad = await systemInfo.currentLoad();
  const fileSystem = await systemInfo.fsSize();
  const cpuTemp = await systemInfo.cpuTemperature();

  return {
    device_id: system.serial,
    used_memory_percentage: calcPercentage(memory.used, memory.total),
    cpu_load: cpuLoad.currentload,
    disk_usage_percentage: fileSystem[0].use,
    cpu_temperature: cpuTemp.main,
    datetime: new Date(),
  };
}

/** getDeviceId gets the device id.
 * @return {String} with the device id.
 */ 
async function getDeviceId() {
  const system = await systemInfo.system();
  return system.serial;
}

module.exports = {
  gather,
  getDeviceId,
};
