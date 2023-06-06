const bouquetModel = require("../../models/bouquet");

module.exports = {
  addToBouquet: async (req, res) => {
    try {
      // 세션에서 구매자 ID 추출 
      const buyerId = req.session.user.id;
      const sellerId = req.session.sellerId;
      //console.log("부케 - 구매자아이디 세션 확인: " + buyerId);
      //console.log("부케 -  판매자아이디 세션 확인: " + sellerId);
    
      let bouquetId = req.session.bouquetId; // 세션에 저장된 장바구니 아이디 읽어오기


      if (!bouquetId) {
        // 꽃다발 아이디가 없는 경우, 꽃다발 새로 생성
        bouquetId = await bouquetModel.createBouquet(buyerId, sellerId);
        req.session.bouquetId = bouquetId; // 생성된 장바구니 아이디 세션에 저장
      }

      // if (!buyerId) {
      //   return res.redirect('/user/login'); // buyerId 값이 없을 경우 리다이렉트
      // }
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
      res.redirect('/user/login');
      //res.status(500).send('Error adding flower to bouquet');
    }
  },
  showBouquet: async (req, res) => {
    try {

      const bouquetId = req.session.bouquetId;
      const sellerId = req.session.sellerId;
      const bouquetItems = await bouquetModel.getBouquetItems(bouquetId, sellerId);
      console.log(bouquetItems.items);
      console.log(bouquetItems.totalPrice);

      res.render('store/bouquet', { bouquetItems });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error displaying cart');
    }
  },

  //꽃다발 꽃 삭제
  deleteBouquetItems: async (req, res) => {
    try {
      //bouquetId, flowerId 받아오기
      const bouquetId = req.params.bouquetId;
      const flowerId = req.params.flowerId;

      await bouquetModel.deleteBouquetItems(bouquetId, flowerId);
      res.redirect('/bouquet');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error delete flower');
    }
  }

};
