// controller/seller/flowers.controller.js
// 판매자 마이페이지 - 상품관리 컨트롤러

// 상품 목록 조회
exports.getFlowers = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 상품 목록 조회 로직
    const query = 'SELECT * FROM flower WHERE seller_id = ?';
    const values = [sellerId];
  
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.render('seller/flowers', { flowers: rows });
      }
    });
  };
  
  // 상품 등록
  exports.addFlower = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const { name, price, description } = req.body;
  
    // 상품 등록 로직
    const query = 'INSERT INTO flower (seller_id, name, price, description) VALUES (?, ?, ?, ?)';
    const values = [sellerId, name, price, description];
  
    connection.query(query, values, (err) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'Failed to add flower' });
      } else {
        res.redirect('/seller/flowers');
      }
    });
  };
  
  // 상품 수정
  exports.updateFlower = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.id;
    const { name, price, description } = req.body;
  
    // 상품 수정 로직
    const query = 'UPDATE flower SET name = ?, price = ?, description = ? WHERE id = ? AND seller_id = ?';
    const values = [name, price, description, flowerId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'Failed to update flower' });
      } else {
        if (result.affectedRows === 0) {
          res.render('error', { message: 'Flower not found' });
        } else {
          res.redirect('/seller/flowers');
        }
      }
    });
  };
  
  // 상품 삭제
  exports.deleteFlower = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.id;
  
    // 상품 삭제 로직
    const query = 'DELETE FROM flower WHERE id = ? AND seller_id = ?';
    const values = [flowerId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'Failed to delete flower' });
      } else {
        if (result.affectedRows === 0) {
          res.render('error', { message: 'Flower not found' });
        } else {
          res.redirect('/seller/flowers');
        }
      }
    });
  };
  
  