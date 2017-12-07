'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const controller = require('../../app/controllers/reading_controller');
const mongooseArrayToObject = require('../helpers/mongoose_array_transformer');
const factory = require('factory-girl').factory;
const Reading = require('../factories/reading_factory');

chai.use(sinonChai);

const expect = chai.expect;

describe('Reading Controller', () => {

  describe('when a reading is added', () => {
    let ctx = {};
    let reading = null;

    beforeEach(async () => {
      reading = await factory.build(Reading);
      ctx = {
        request: {
          body: reading,
        },
      };
    });

    it('should return status code 201', async () => {
      await controller.add(ctx);
      expect(ctx.status).to.equal(201);
    });
  });

  describe('when there is an error adding the reading', () => {
    let ctx = {};
    let ctxThrowSpy = null;

    beforeEach(async () => {
      ctx = {
        request: {
          body: {
            device_id: '1a23',
          },
        },
        throw: () => {},
      };
      ctxThrowSpy = sinon.spy(ctx, 'throw');
    });

    it('should return status code 400', async () => {
      await controller.add(ctx);
      expect(ctxThrowSpy).to.have.been.calledWith(400);
    });
  });

  describe('when searching a query', () => {
    let ctx = {};
    let reading = null;

    beforeEach(async () => {
      ctx = {
        query: { device_id: '125' },
      };
      reading = await factory.create(Reading);
    });

    it('should return status code 200', async () => {
      await controller.search(ctx);
      expect(ctx.status).to.equal(200);
      const result = mongooseArrayToObject(ctx.body);
      expect(result).to.deep.include(reading.toObject());
    });
  });
});
