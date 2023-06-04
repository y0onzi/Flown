// controllers/seller/notices.controller.js

// 공지사항 목록 조회
exports.getNotices = (req, res) => {
   
    const query = 'SELECT * FROM notice';
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '공지사항 목록을 불러오지 못했습니다' });
      } else {
        res.render('seller/notices', { notices: rows });
      }
    });
  };
  
  // 공지사항 등록
  exports.addNotice = (req, res) => {
   
    const { title, content } = req.body;
    const query = 'INSERT INTO notice (title, content) VALUES (?, ?)';
    const values = [title, content];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '공지사항을 등록하지 못했습니다' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };


  // 공지사항 수정
  exports.updateNotice = (req, res) => {
   
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const noticeId = req.params.noticeId;
    const { title, content } = req.body;
  
    const query = 'UPDATE notice SET title = ?, content = ? WHERE notice_id = ? AND seller_id = ?';
    const values = [title, content, noticeId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '공지사항을 수정하지 못했습니다' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  
  // 공지사항 삭제
  exports.deleteNotice = (req, res) => {
   
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const noticeId = req.params.noticeId;
  
    const query = 'DELETE FROM notice WHERE id = ? AND seller_id = ?';
    const values = [noticeId, sellerId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '공지사항을 삭제하지 못했습니다' });
      } else {
        res.redirect('/seller/notices');
      }
    });
  };
  

  