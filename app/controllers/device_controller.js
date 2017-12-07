'use strict';

const repo = require('../repos/device_repo');
const constants = require('../constants/constants');

/** Device controller provides device related services
 * @module controller/device_controller
 */

/** registerDevice registers a device if it is not already
* registered.
* @param {Object} ctx - koa aplication context.
* @return {Object} with confirmation or error of registering a device.
*/
async function registerDevice(ctx) {
  const device = ctx.request.body;
  await repo.add(device)
    .then((result) => {
      ctx.status = 201;
      ctx.body = result;
    })
    .catch((error) => {
      if (error.name === constants.ValidationFailedError) {
        ctx.throw(400, error);
      } else if (error.code === constants.EntryAlreadyExistsCode) {
        ctx.throw(409, error);
      }
    });
}


module.exports = {
  register: registerDevice,
};
