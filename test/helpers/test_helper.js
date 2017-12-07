'use strict';

const mongoose = require('mongoose');
const config = require('config');

process.env.NODE_ENV = 'test';
const database = config.get(`database.${process.env.NODE_ENV}.localUrl`);

mongoose.Promise = global.Promise;

before(async () => {
  await mongoose.connect(database, { useMongoClient: true });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});
