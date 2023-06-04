// routes/seller/notices.route.js
const express = require('express');
const router = express.Router();
const noticesController = require('../../controllers/seller/notices.controller');
//const { ensureAuthenticated } = require('../../middlewares/auth');

// 판매자 공지사항 페이지로 이동
router.get('/seller/notices', /*ensureAuthenticated,*/ (req, res, next) => {
  noticesController.getNotices(req, res, next);
});

// 공지사항 등록
router.post('/seller/notices', (req, res, next) => {
  noticesController.addNotice(req, res, next);
});

// 공지사항 삭제
router.delete('/seller/notices/:noticeId', (req, res, next) => {
  noticesController.deleteNotice(req, res, next);
});

// 공지사항 수정
router.patch('/seller/notices/:noticeId', (req, res, next) => {
  noticesController.updateNotice(req, res, next);
});

module.exports = router;
