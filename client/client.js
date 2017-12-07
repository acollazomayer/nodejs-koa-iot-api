'use strict';

const communication = require('./lib/communication');
const information = require('./lib/information');

const DeviceNameLocation = 2;

async function main() {
  const deviceName = process.argv[DeviceNameLocation];
  const deviceId = await information.getDeviceId();

  await communication.register(deviceId, deviceName);

  setInterval(async () => {
    const data = await information.gather();
    communication.send(data);
  }, 3000);
}

main();
