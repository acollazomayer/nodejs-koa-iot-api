'use strict';

const expect = require('chai').expect;
const repo = require('../../app/repos/device_repo');
const constants = require('../../app/constants/constants');
const factory = require('factory-girl').factory;
const Device = require('../factories/device_factory');

describe('Device Repo', () => {

  describe('when a device is added', () => {
    let device = {};

    beforeEach(async () => {
      device = await factory.build(Device);
    });

    it('should return the device', async () => {
      await repo.add(device)
        .then((result) => {
          expect(result).to.include(device);
        });
    });
  });

  describe('when a device is added but its id already exists', () => {
    let device = {};

    beforeEach(async () => {
      device = await factory.create(Device);
    });

    it('should return an error', async () => {
      await repo.add(device)
        .catch((error) => {
          expect(error.code).to.equal(constants.EntryAlreadyExistsCode);
        });
    });
  });


  describe('when there is an error adding a device', () => {
    const device = {};

    it('should return an error', async () => {
      await repo.add(device)
        .catch((error) => {
          expect(error).to.exist;
        });
    });
  });
});
