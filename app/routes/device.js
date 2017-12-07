'use strict';

const Router = require('koa-router');
const controller = require('../controllers/device_controller');

/** Koa router providing device related routes
 * @module routes/devices
 */
const router = new Router();

router.post('/device/register', controller.register);

module.exports = router.routes();
