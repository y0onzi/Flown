// controllers/seller/orders.controller.js
// 판매자 주문확인 컨트롤러

// 주문 목록 조회
exports.getOrders = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 주문 목록 조회 로직
    const query = 'SELECT * FROM orders WHERE seller_id = ?';
    const values = [sellerId];
  
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.render('seller/orders', { orders: rows });
      }
    });
  };
  
  // 주문 상태 등록
  exports.registerOrderStatus = (req, res) => {
    // 주문 상태 등록 로직
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const orderId = req.params.orderId;
    const { status } = req.body;
  
    const query = 'UPDATE orders SET status = ? WHERE id = ? AND seller_id = ?';
    const values = [status, orderId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/orders');
      }
    });
  };
  
  // 주문 상태 수정
  exports.updateOrderStatus = (req, res) => {
    // 주문 상태 수정 로직
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const orderId = req.params.orderId;
    const { status } = req.body;
  
    const query = 'UPDATE orders SET status = ? WHERE id = ? AND seller_id = ?';
    const values = [status, orderId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/orders');
      }
    });
  };
  
  