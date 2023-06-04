// routes/seller/sellerMypage.route.js

const express = require('express');
const router = express.Router();
const sellerMypageController = require('../../controllers/seller/sellerMypage.controller');
//const { ensureAuthenticated } = require('../middlewares/auth');

// 판매자 마이페이지 조회
router.get('/seller/mypage/:sellerId', /*ensureAuthenticated,*/ sellerMypageController.getSellerMypage);

// 판매자 정보 수정
router.post('/seller/mypage/:sellerId', sellerMypageController.updateSellerProfile);

// 상품관리 페이지로 이동
router.get('/:sellerId/flowers', (req, res) => {
  const sellerId = req.params.sellerId;

  // 판매자의 상품관리 페이지로 이동
  res.render('seller/flowers', { sellerId });
});

// 주문확인 페이지로 이동
router.get('/:sellerId/orders', (req, res) => {
  const sellerId = req.params.sellerId;

  // 판매자의 주문확인 페이지로 이동
  res.render('seller/orders', { sellerId });
});

// 공지사항 페이지로 이동
router.get('/:sellerId/notice', (req, res) => {
  const sellerId = req.params.sellerId;

  // 판매자의 공지사항 페이지로 이동
  res.render('seller/notice', { sellerId });
});

/*
// 매장페이지로 이동
router.get('/:sellerId/store', (req, res) => {
  const sellerId = req.params.sellerId;

  // 판매자의 매장페이지로 이동
  res.render('seller/store', { sellerId });
});
*/






