const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', indexController.home);

/* GET detail page */
router.get('/detail', indexController.detail);

/* POST buy product */
router.post('/buy', indexController.buy);

/* GET redirect from mercadopago */
router.get('/mercadopagoRedirect', indexController.mercadopagoRedirect)


/* POST notification from mercadopago */
router.post('/mercadopagoNotification', indexController.mercadopagoNotification)

module.exports = router;
