'use strict';

const expect = require('chai').expect;
const Reading = require('../../app/models/reading.js');

describe('Reading Schema', () => {
  let reading = null;

  beforeEach(() => {
    reading = new Reading();
  });

  describe('when device_id is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.device_id).to.exist;
      }
    });
  });

  describe('when used_memory_percentage is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.used_memory_percentage).to.exist;
      }
    });
  });

  describe('when cpu_load is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.cpu_load).to.exist;
      }
    });
  });

  describe('when disk_usage_percentage is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.disk_usage_percentage).to.exist;
      }
    });
  });

  describe('when cpu_temperature is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.cpu_temperature).to.exist;
      }
    });
  });

  describe('when datetime is empty', () => {

    it('should be invalid', async () => {
      try {
        await reading.validate();
      } catch (error) {
        expect(error.errors.datetime).to.exist;
      }
    });
  });
});
