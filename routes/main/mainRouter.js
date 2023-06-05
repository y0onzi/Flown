const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

router.get('/', mainController.showMain);

module.exports = router;