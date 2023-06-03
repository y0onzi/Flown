//searchRoute.js

const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/searchController');

router.get('/', searchController.getSearchPage);
router.get('/regions', searchController.getRegions);
router.get('/locations', searchController.getLocations);
router.post('/stores', searchController.searchStores);

module.exports = router;