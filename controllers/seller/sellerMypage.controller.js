// controllers/seller/sellerMypage.controller.js
require('dotenv').config(); // .env 파일 로드
const { db } = require('../../config/database')

// 판매자 마이페이지 조회
exports.sellerMypage = async (req, res) => {
  const sellerId = req.session.user.id;

  try {
    const connection = await db.getConnection();

    // 판매자 정보 조회 쿼리문
    const query = `SELECT * FROM seller_info WHERE seller_id = '${sellerId}';`;

    //쿼리 실행
    const [results] = await connection.query(query);

    // 조회된 판매자 정보를 사용하여 판매자 마이페이지 렌더링
    const seller = results[0];
    res.render('seller/mypage', { seller });

    // 연결 반환
    connection.release();
  } catch (err) {
    // 오류 처리
    console.error(err);
    res.status(500).send('Error');
  }
};
  

// 판매자 프로필 정보 수정
exports.updateSellerProfile = (req, res) => {
  const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
  
  // 요청에서 전달된 수정할 프로필 정보 추출
  const {storeName, address_district, address_city, address_dong, address_detail, storePhoneNumber, storeStatus } = req.body;
  
  // 판매자 프로필 정보 업데이트
  const query = 'UPDATE seller_info SET storeName = ?, address_district  = ?, address_city = ?, address_dong = ?, address_detail = ?, storePhoneNumber = ?, storeStatus = ? WHERE seller_id = ?';
  const values = [storeName, address_district, address_city, address_dong, address_detail, storePhoneNumber, storeStatus, sellerId];
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error', { message: '프로필 정보를 수정하지 못했습니다' });
    } else {
     // 업데이트 후, 수정된 프로필 정보를 다시 조회하여 화면에 나타냄
     const selectQuery = 'SELECT * FROM seller_info WHERE seller_id = ?';
     const selectValues = [sellerId];

     db.query(selectQuery, selectValues, (selectErr, selectResult) => {
       if (selectErr) {
         console.error(selectErr);
         res.render('error', { message: '수정된 프로필 정보를 불러오지 못했습니다' });
       } else {
         const seller = selectResult[0];
         res.render('seller/mypage', { seller });
       }
     });
   }
 });
};
