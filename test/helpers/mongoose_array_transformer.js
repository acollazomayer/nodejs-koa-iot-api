'use strict'

function mongooseArrayToObject(mongooseArray) {
  return mongooseArray.map((element) => {
    return element.toObject();
  });
}

module.exports = mongooseArrayToObject;
