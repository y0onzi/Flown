const { compare } = require("bcrypt");
const bouquetModel = require("../../models/bouquet");
const checkLogin = require("../../util/checkLogin");

module.exports = {
  addToBouquet: async (req, res) => {
    checkLogin;
    try {
      // 세션에서 구매자+판매자 ID 추출 
      const buyerId = req.session.user.id;
      const sellerId = req.session.sellerId;
      //console.log("부케 - 구매자아이디 세션 확인: " + buyerId);
      console.log("부케 -  판매자아이디 세션 확인: " + sellerId);

      // 꽃다발 검증
      let bouquetId = req.session.bouquetId;

      if (!bouquetId) {
        // 꽃다발 아이디가 없는 경우, 새로운 꽃다발 생성
        bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
        req.session.bouquetId = bouquetId;
      } else {
        // 꽃다발 아이디가 있는 경우, 해당 꽃다발의 is_new 값 확인
        const existingBouquet = await bouquetModel.getBouquetById(bouquetId, buyerId, sellerId);
        if (!existingBouquet || existingBouquet.is_new === 2) {
          // 꽃다발이 없거나 is_new가 2인 경우, 새로운 꽃다발 생성
          bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
          req.session.bouquetId = bouquetId;
        }
      }


      console.log("부케아이디확인: " + bouquetId)

      // 꽃다발에 꽃 추가
      const flowerId = req.body.flowerId;
      const quantity = req.body.quantity;
      await bouquetModel.insertToBouquet(bouquetId, flowerId, quantity);

      //req.session.bouquetId = bouquetId;

      //res.send('Flower added to Bouquet!!!!');
      //res.render("store/index");
      res.redirect(`/store/${sellerId}`);
    } catch (err) {
      console.error(err);

      // user id 없으면 리다이렉트
      //res.redirect('/user/login');
      //res.status(500).send('Error adding flower to bouquet');
    }
  },
  showBouquet: async (req, res) => {
    try {

      const bouquetId = req.session.bouquetId;
      console.log("컨트롤러에서 꽃다발id 확인: " + bouquetId);
      //const sellerId = req.session.sellerId;
      const bouquetItems = await bouquetModel.getBouquetItems(bouquetId);
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

// module.exports = {
//   addToBouquet: async (req, res) => {


//     try {
//       // 사용자 로그인 체크
//       checkLogin(req, res, async () => {
//         // 세션에서 구매자 ID 추출
//         const buyerId = req.session.user.id;
//         const sellerId = req.session.sellerId;

//         let bouquetId = req.session.bouquetId; // 세션에 저장된 장바구니 아이디 읽어오기

//         if (!bouquetId) {
//           // 꽃다발 아이디가 없는 경우, 꽃다발 새로 생성
//           bouquetId = await bouquetModel.createBouquet(buyerId, sellerId);
//           req.session.bouquetId = bouquetId; // 생성된 장바구니 아이디 세션에 저장
//         }

//         console.log("부케아이디확인: " + bouquetId)

//         // 꽃다발에 꽃 추가
//         const flowerId = req.body.flowerId;
//         const quantity = req.body.quantity;
//         await bouquetModel.insertToBouquet(bouquetId, flowerId, quantity);

//         res.redirect(`/store/${sellerId}`);
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error adding flower to bouquet');
//     }
//   },
//   showBouquet: async (req, res) => {
//     try {
//       const bouquetId = req.session.bouquetId;
//       const sellerId = req.session.sellerId;
//       const bouquetItems = await bouquetModel.getBouquetItems(bouquetId, sellerId);
//       console.log(bouquetItems.items);
//       console.log(bouquetItems.totalPrice);

//       res.render('store/bouquet', { bouquetItems });

//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error displaying cart');
//     }
//   }
// };

//==================================================//
/*
let bouquetId = req.session.bouquetId; // 세션에 저장된 장바구니 아이디 읽어오기
console.log("부케컨트롤러 : " + bouquetId);
// if (!bouquetId) {
//   // 꽃다발 아이디가 없는 경우, 꽃다발 새로 생성
//   bouquetId = await bouquetModel.createBouquet(buyerId, sellerId);
//   req.session.bouquetId = bouquetId; // 생성된 꽃다발 아이디 세션에 저장
// }

// 판매자와 구매자에 대한 꽃다발 정보 조회
const existingBouquet = await bouquetModel.getExistingBouquet(buyerId, sellerId);
//let bouquetId;
console.log(existingBouquet)
console.log("\n이거새거임?" + existingBouquet.is_new)
*/
      // if (existingBouquet && existingBouquet.is_new === 1) {
      //   // 이미 꽃이 추가된 꽃다발인 경우 - 꽃다발id 계속 사용
      //   bouquetId = existingBouquet.bouquet_id;
      // } else {
      //   // 새로운 꽃다발 생성
      //   bouquetId = await bouquetModel.createBouquet(buyerId, sellerId);
      //   //req.session.bouquetId = bouquetId;
      // }

      // //꽃다발 검증
      // let isNewValue;
      // if (bouquetId === null ) {
      //   // 꽃다발 정보가 없는 경우 - 새로운 꽃다발 생성
      //   isNewValue = 0;
      //   bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, isNewValue);
      // } else if (existingBouquet.is_new === 0) {
      //   // 꽃다발 정보 존재 + is_new가 0인 경우 - 비어있는 꽃다발이므로 새로운 꽃다발 생성
      //   isNewValue = 1;
      //   bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, isNewValue);
      // } else if (existingBouquet.is_new === 1) {
      //   // 꽃다발 정보 존재 + is_new가 1인 경우 - 이미 꽃이 담긴 꽃다발이므로 기존 꽃다발 사용
      //   bouquetId = existingBouquet.bouquet_id;
      // } else if (existingBouquet.is_new === 2) {
      //   //구매자가 같은 판매자에게서 구매하는 경우
      //   // 꽃다발 정보 존재 + is_new가 2인 경우 - 주문 완료된 꽃다발이므로 새로운 꽃다발 생성
      //   isNewValue = 0;
      //   bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, isNewValue);
      // }

      // // 꽃다발 검증
      // const bouquet = await bouquetModel.getExistingBouquet(buyerId, sellerId);

      // if (!bouquet) {
      //   // 꽃다발이 없는 경우: 완전 비어진 꽃다발이므로 새로운 꽃다발 생성
      //   const newBouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
      //   req.session.bouquetId = newBouquetId;
      // } else if (bouquet.is_new === 2) {
      //   // is_new가 2인 경우: 이미 주문 완료된 꽃다발이므로 새로운 꽃다발 생성
      //   const newBouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
      //   req.session.bouquetId = newBouquetId;
      // }