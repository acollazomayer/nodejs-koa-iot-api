'use strict';

const Koa = require('koa');
const config = require('config');
const morgan = require('koa-morgan');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const deviceRoutes = require('./app/routes/device.js');
const readingRoutes = require('./app/routes/readings.js');

const app = new Koa();
const port = config.get('port');
const environment = process.env.NODE_ENV || 'dev';
const database = config.get(`database.${environment}.localUrl`);

mongoose.connect(database, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(morgan(environment));
app.use(bodyParser());

app.use(deviceRoutes);
app.use(readingRoutes);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
