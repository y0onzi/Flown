// routes/seller/sellerMypage.route.js

const express = require('express');
const router = express.Router();
const sellerMypageController = require('../../controllers/seller/sellerMypage.controller');

// 판매자 마이페이지 조회
router.get('/:sellerId/mypage', sellerMypageController.getSellerMypage);

// 판매자 정보 수정
router.post('/:sellerId/mypage', sellerMypageController.updateSellerProfile);

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

// 매장페이지로 이동
router.get('/:sellerId/store', (req, res) => {
  const sellerId = req.params.sellerId;

  // 판매자의 매장페이지로 이동
  res.render('seller/store', { sellerId });
});

// 판매자 로그아웃 처리
router.post('/logout', (req, res) => {
  // 로그아웃 처리 로직을 구현합니다.
  // 세션 등의 관리 방식에 따라 세션 삭제 등의 작업을 수행합니다.

  // 로그아웃 성공 메시지를 클라이언트에 응답으로 보냅니다.
  res.json({ message: '로그아웃 되었습니다.' });
});

module.exports = router;






