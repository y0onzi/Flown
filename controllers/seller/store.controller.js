// controllers/seller/store.controller.js
// 판매자 매장페이지 컨트롤러


// 매장페이지 조회
exports.getStorePage = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 매장페이지 조회 로직
    const query = 'SELECT * FROM store WHERE seller_id = ?';
    const values = [sellerId];
  
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        if (rows.length === 0) {
          res.render('error', { message: 'Store not found' });
        } else {
          res.render('seller/store', { store: rows[0] });
        }
      }
    });
  };
  