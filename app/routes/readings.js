'use strict';

const Router = require('koa-router');
const controller = require('../controllers/reading_controller');

/** Koa router providing device related routes
 * @module routes/devices
 */
const router = new Router();

router.post('/readings/add', controller.add);
router.get('/readings/search', controller.search);

module.exports = router.routes();
