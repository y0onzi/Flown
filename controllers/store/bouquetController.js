const bouquetModel = require("../../models/bouquet");

module.exports = {
  addToBouquet: async (req, res) => {
    try {
      // 세션에서 구매자 ID 추출 
      const buyerId = req.session.user.id;
      const sellerId = req.session.sellerId;

      // 꽃다발 생성
      const bouquetId = await bouquetModel.createBouquet(buyerId);
      console.log("부케아이디확인: " + bouquetId)
      
      // 꽃다발에 꽃 추가
      const flowerId = req.body.flowerId;
      const quantity = req.body.quantity;
      await bouquetModel.insertToBouquet(bouquetId, flowerId, quantity);

      //res.send('Flower added to Bouquet!!!!');
      //res.render("store/index");
      res.redirect(`/store/${sellerId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding flower to bouquet');
    }
  }
};
