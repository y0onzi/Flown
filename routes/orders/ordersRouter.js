const router = require('express').Router();
const ordersController = require('../../controllers/orders/ordersController');

router.get('/orders/sheet/:id', ordersController.getOrdersheet);

router.post('/orders/sheet', ordersController.createOrdersheet);

module.exports = router;