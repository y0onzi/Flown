// controllers/seller/notices.controller.js
// 판매자 공지사항 컨트롤러


// 공지사항 목록 조회
exports.getNotices = (req, res) => {
    // 공지사항 목록 조회 로직
    const query = 'SELECT * FROM notice';
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.render('seller/notices', { notices: rows });
      }
    });
  };
  
  // 공지사항 등록
  exports.addNotice = (req, res) => {
    // 공지사항 등록 로직
    const { title, content } = req.body;
    const query = 'INSERT INTO notice (title, content) VALUES (?, ?)';
    const values = [title, content];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  
  // 공지사항 수정
  exports.updateNotice = (req, res) => {
    // 공지사항 수정 로직
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const noticeId = req.params.noticeId;
    const { title, content } = req.body;
  
    const query = 'UPDATE notice SET title = ?, content = ? WHERE id = ? AND seller_id = ?';
    const values = [title, content, noticeId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  
  // 공지사항 삭제
  exports.deleteNotice = (req, res) => {
    // 공지사항 삭제 로직
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const noticeId = req.params.noticeId;
  
    const query = 'DELETE FROM notice WHERE id = ? AND seller_id = ?';
    const values = [noticeId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  

  