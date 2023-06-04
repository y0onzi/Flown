// controllers/seller/orders.controller.js
// 판매자 주문확인 컨트롤러

// 주문 목록 조회
exports.getOrders = (req, res) => {
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
  
    const query = 'SELECT * FROM orders AS o JOIN orderItem AS oi ON o.order_id = oi.order_id WHERE o.seller_id = ?';
    const values = [sellerId];
  
    connection.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '주문 목록을 불러오지 못했습니다' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  
  // 주문 상태 등록
  exports.registerOrderStatus = (req, res) => {
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const orderId = req.params.orderId;
    const { status } = req.body;
  
    const query = 'UPDATE orders SET status = ? WHERE id = ? AND seller_id = ?';
    const values = [status, orderId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '주문 상태를 등록하지 못했습니다' });
      } else {
        res.redirect('/seller/orders');
      }
    });
  };
  
  // 주문 상태 수정
  exports.updateOrderStatus = (req, res) => {
    // 주문 상태 수정 로직
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const orderId = req.params.order_id;
    const { status } = req.body;
  
    const query = 'UPDATE orders SET status = ? WHERE order_id = ? AND seller_id = ?';
    const values = [status, orderId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '주문 상태를 수정하지 못했습니다' });
      } else {
        res.redirect('/seller/orders');
      }
    });
  };
  
  