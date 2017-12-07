'use strict';

const expect = require('chai').expect;
const repo = require('../../app/repos/reading_repo');
const mongooseArrayToObject = require('../helpers/mongoose_array_transformer');
const factory = require('factory-girl').factory;
const Reading = require('../factories/reading_factory');

describe('Reading Repo', () => {

  describe('when a reading is added', () => {
    let reading = null;

    beforeEach(async () => {
      reading = await factory.build(Reading, { device_id: 'abc' });
    });

    it('should return the reading', async () => {
      await repo.add(reading)
        .then((result) => {
          expect(result).to.include(reading);
        });
    });
  });

  describe('when there is an error adding a reading', () => {
    const emptyReading = {};

    it('should return an error', async () => {
      await repo.add(emptyReading)
        .catch((error) => {
          expect(error).to.exist;
        });
    });
  });

  describe('query', () => {

    describe('when a reading is searched by device_id', () => {
      let query = {};
      let reading = null;
      let readingNotInQuery = null;

      beforeEach(async () => {
        query = { device_id: '125' };
        reading = await factory.create(Reading);
        readingNotInQuery = await factory.create(Reading, { device_id: 'someid' });
      });

      it('should return only one reading', async () => {
        await repo.search(query)
          .then((result) => {
            result = mongooseArrayToObject(result);
            expect(result).to.deep.include(reading.toObject());
            expect(result).to.not.deep.include(readingNotInQuery.toObject());
          });
      });

      describe('when a reading is searched by used_memory_percentage', () => {

        beforeEach(async () => {
          query = Object.assign(query, { used_memory_percentage: 4 });
          reading = await factory.create(Reading);
          readingNotInQuery = await factory.create(Reading, { used_memory_percentage: 123 });
        });

        it('should return only one reading', async () => {
          await repo.search(query)
            .then((result) => {
              result = mongooseArrayToObject(result);
              expect(result).to.deep.include(reading.toObject());
              expect(result).to.not.deep.include(readingNotInQuery.toObject());
            });
        });

        describe('when a reading is searched by cpu_load', () => {

          beforeEach(async () => {
            query = Object.assign(query, { cpu_load: 12 });
            reading = await factory.create(Reading);
            readingNotInQuery = await factory.create(Reading, { cpu_load: 123 });
          });

          it('should return only one reading', async () => {
            await repo.search(query)
              .then((result) => {
                result = mongooseArrayToObject(result);
                expect(result).to.deep.include(reading.toObject());
                expect(result).to.not.deep.include(readingNotInQuery.toObject());
              });
          });

          describe('when a reading is searched by disk_usage_percentage', () => {

            beforeEach(async () => {
              query = Object.assign(query, { disk_usage_percentage: 213 });
              reading = await factory.create(Reading);
              readingNotInQuery = await factory.create(Reading, { cpu_load: 123 });
            });

            it('should return only one reading', async () => {
              await repo.search(query)
                .then((result) => {
                  result = mongooseArrayToObject(result);
                  expect(result).to.deep.include(reading.toObject());
                  expect(result).to.not.deep.include(readingNotInQuery.toObject());
                });
            });

            describe('when a reading is searched by cpu_temperature', () => {

              beforeEach(async () => {
                query = Object.assign(query, { cpu_temperature: 12 });
                reading = await factory.create(Reading);
                readingNotInQuery = await factory.create(Reading, { cpu_temperature: 123 });
              });

              it('should return only one reading', async () => {
                await repo.search(query)
                  .then((result) => {
                    result = mongooseArrayToObject(result);
                    expect(result).to.deep.include(reading.toObject());
                    expect(result).to.not.deep.include(readingNotInQuery.toObject());
                  });
              });
            });
          });
        });
      });
    });
  });

  describe('when an empty query is given', () => {
    const query = {};
    let reading = null;

    beforeEach(async () => {
      reading = await factory.create(Reading);
    });

    it('should return all records in the database', async () => {
      await repo.search(query)
        .then((result) => {
          result = mongooseArrayToObject(result);
          expect(result).to.deep.include(reading.toObject());
        });
    });
  });

  describe('when query is searched with multiple parameters', () => {
    let query = {};
    let reading = null;
    let missingReadingsArray = [];

    beforeEach(async () => {
      query = {
        device_id: '125',
        used_memory_percentage: 4,
        cpu_load: 12,
        disk_usage_percentage: 213,
        cpu_temperature: 12
      };
      reading = await factory.create(Reading);
      missingReadingsArray.push(
        await factory.create(Reading, { device_id: 'abc' }),
        await factory.create(Reading, { used_memory_percentage: 1 }),
        await factory.create(Reading, { used_memory_percentage: 1 }),
        await factory.create(Reading, { cpu_load: 2 }),
        await factory.create(Reading, { disk_usage_percentage: 3 }),
        await factory.create(Reading, { cpu_temperature: 4 }),
      );
      missingReadingsArray = mongooseArrayToObject(missingReadingsArray);
    });

    it('should return only one reading', async () => {
      await repo.search(query)
        .then((result) => {
          result = mongooseArrayToObject(result);
          expect(result).to.deep.include(reading.toObject());
          expect(result).to.not.deep.include(missingReadingsArray);
        });
    });
  });
});
