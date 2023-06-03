// controllers/seller/sellerMypage.controller.js
// 판매자 마이페이지 컨트롤러

// 판매자 마이페이지 조회
exports.getSellerMypage = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 판매자 정보 조회 로직
    const query = 'SELECT * FROM seller WHERE id = ?';
    const values = [sellerId];
  
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        if (rows.length === 0) {
          res.render('error', { message: 'Seller not found' });
        } else {
          res.render('seller/sellerMypage', { seller: rows[0] });
        }
      }
    });
  };
  
  // 판매자 정보 수정
  exports.updateSellerProfile = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 요청에서 전달된 수정할 프로필 정보 추출
    const { storeName, storeAddress, storePhoneNumber, profileImage, businessStatus } = req.body;
  
    // 판매자 정보 업데이트 로직
    const query = 'UPDATE seller SET store_name = ?, store_address = ?, store_phone_number = ?, profile_image = ?, business_status = ? WHERE id = ?';
    const values = [storeName, storeAddress, storePhoneNumber, profileImage, businessStatus, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/mypage');
      }
    });
  };
  
  