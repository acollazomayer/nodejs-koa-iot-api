'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const controller = require('../../app/controllers/device_controller');
const factory = require('factory-girl').factory;
const Device = require('../factories/device_factory');

chai.use(sinonChai);

const expect = chai.expect;

describe('Device Controller', () => {

  describe('when a device is already registered', () => {
    let ctx = {};
    let ctxThrowSpy = null;
    let device = null;

    beforeEach(async () => {
      device = await factory.build(Device);
      ctx = {
        request: {
          body: device,
        },
        throw: () => {},
      };
      await controller.register(ctx);
      ctxThrowSpy = sinon.spy(ctx, 'throw');
    });

    it('should return status code 409', async () => {
      await controller.register(ctx);
      expect(ctxThrowSpy).to.have.been.calledWith(409);
    });
  });

  describe('when a device is registered', () => {
    let ctx = {};
    let device = null;

    beforeEach(async () => {
      device = await factory.build(Device);
      ctx = {
        request: {
          body: device,
        },
      };
    });

    it('should return status code 201', async () => {
      await controller.register(ctx);
      expect(ctx.status).to.equal(201);
      expect(ctx.body).to.include(device, '_id');
    });
  });

  describe('when there is an error registering the device', () => {
    let ctx = {};
    let ctxThrowSpy = null;

    beforeEach(async () => {
      ctx = {
        request: {
          body: {
            name: 'somename',
          },
        },
        throw: () => {},
      };
      await controller.register(ctx);
      ctxThrowSpy = sinon.spy(ctx, 'throw');
    });

    it('should return status code 400', async () => {
      await controller.register(ctx);
      expect(ctxThrowSpy).to.have.been.calledWith(400);
    });
  });
});
