// routes/seller/orders.route.js

const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/seller/orders.controller');
const { ensureAuthenticated, ensureAuthorized } = require('../../middlewares/auth');

// 주문 목록 불러오기
router.get('/orders', ensureAuthenticated, ensureAuthorized, ordersController.getOrders);

// 주문 상태 등록
router.post('/orders/:orderId/register', ensureAuthenticated, ensureAuthorized, ordersController.registerOrderStatus);

// 주문 상태 수정
router.patch('/orders/:orderId/update', ensureAuthenticated, ensureAuthorized, ordersController.updateOrderStatus);

module.exports = router;


