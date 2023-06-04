const express = require('express');
const router = express.Router();
const flowersController = require('../../controllers/seller/flowers.controller');
//const { ensureAuthenticated } = require('../../middlewares/auth');

// 상품 목록 조회
router.get('/seller/flowers', flowersController.getFlowers);
// 상품 등록
router.post('/seller/flowers/add', flowersController.addFlower);
// 상품 수정
router.patch('/seller/flowers/update/:flowerId', flowersController.updateFlower);
// 상품 삭제
router.delete('/seller/flowers/delete/:flowerId', flowersController.deleteFlower);

module.exports = router;