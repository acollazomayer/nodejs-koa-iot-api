'use strict';

const repo = require('../repos/reading_repo');
const constants = require('../constants/constants');

/** Reading controller provides readings related services
 * @module controller/reading_controller
 */

/** addReading adds a reading in the database.
* @param {Object} ctx - koa aplication context.
* @return {Object} with confirmation or error of adding a reading.
*/
async function addReading(ctx) {
  const device = ctx.request.body;
  await repo.add(device)
    .then(() => {
      ctx.status = 201;
    })
    .catch((error) => {
      if (error.name === constants.ValidationFailedError) {
        ctx.throw(400, error);
      } else {
        ctx.throw(500, error);
      }
    });
}

/** searchReadings searches a reading in the database with specific parameters.
* @param {Object} ctx - koa aplication context.
* @return {Object} with confirmation or error of adding a reading.
*/
async function searchReadings(ctx) {
  const query = ctx.query;
  await repo.search(query)
    .then((result) => {
      ctx.status = 200;
      ctx.body = result;
    })
    .catch((error) => {
      ctx.throw(500, error);
    });
}

module.exports = {
  add: addReading,
  search: searchReadings,
};
