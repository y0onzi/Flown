const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/map/searchController');

// 검색 페이지 렌더링
router.get('/', searchController.renderSearchPage);

// 검색 결과 조회
router.post('/results', searchController.getSearchResults);

module.exports = router;