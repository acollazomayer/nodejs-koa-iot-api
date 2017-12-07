'use strict';

const expect = require('chai').expect;
const Device = require('../../app/models/device.js');

describe('Device Schema', () => {
  let device = null;

  beforeEach(() => {
    device = new Device();
  });

  describe('when device_id is empty', () => {

    it('should be invalid', async () => {
      try {
        await device.validate();
      } catch (error) {
        expect(error.errors.device_id).to.exist;
      }
    });
  });

  describe('when name is empty', () => {

    it('should be invalid', async () => {
      try {
        await device.validate();
      } catch (error) {
        expect(error.errors.name).to.exist;
      }
    });
  });
});
