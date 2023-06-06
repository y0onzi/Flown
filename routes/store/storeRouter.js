const router = require('express').Router();
const storeController = require('../../controllers/store/storeController');
const bouquetController = require('../../controllers/store/bouquetController');

// 가게 페이지 라우팅
router.get('/store/:sellerId', storeController.showStore);
//router.get('/bouquet', bouquetController.addToBouquet);

//꽃다발 수량 페이지 
router.get('/bouquet/quantity/:flowerId', (req, res) => {
  const flowerId = req.params.flowerId;
  res.render('store/bouquetQuantity', { flowerId });
});

//꽃다발 수량 페이지 
router.post('/bouquet/addToBouquet', bouquetController.addToBouquet);

//꽃다발 조회 페이지
router.get('/bouquet', bouquetController.showBouquet);

router.delete('/bouquet/:bouquetId/:flowerId', bouquetController.deleteBouquetItems);


module.exports = router;