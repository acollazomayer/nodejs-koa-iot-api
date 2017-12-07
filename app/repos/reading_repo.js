'use strict';

const Readings = require('../models/reading');

/** Reading repo provides readings related database services
 * @module repos/reading_repo
 */

/** readingAdd adds a reading in the database.
 * @param {Object} reading - Object containing all the fields of a reading.
 * @return {Promise} resolving the reading or rejecting errors.
 */
async function readingAdd(reading) {
  return Readings.create(reading);
}

/** readingSearch search for the readings of a specific query in the database.
 * @param {Object} query - Object containing all the fields of the query.
 * @return {Promise} resolving the query or rejecting errors.
 */
async function readingSearch(query) {
  return Readings.find(query);
}

module.exports = {
  add: readingAdd,
  search: readingSearch,
};
