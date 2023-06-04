// controller/seller/flowers.controller.js
//const connection = require('../../config/database').connection;
const db = require('../../config/database').db;
const upload = require('../../middlewares/upload');

// 상품 목록 조회
exports.getFlowers = (req, res) => {
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const query = 'SELECT * FROM flower WHERE seller_id = ?';
    const values = [sellerId];
  
    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '상품 목록을 불러오지 못했습니다' });
      } else {
        res.render('seller/flowers', { flowers: rows });
      }
    });
  };
  


  // 상품 등록
  exports.addFlower = (req, res) => {
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const { name, price, color, isSoldOut } = req.body;
    const photo = req.file.filename;

    const query = 'INSERT INTO flower (name, price, color, photo, isSoldOut) VALUES (?, ?, ?, ?, ?)';
    const values = [name, price, color, photo, isSoldOut];

    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '상품을 등록하지 못했습니다' });
      } else {
         res.redirect('/login'); // 로그인 페이지로 리디렉션
        }
    });
  };
  
  // 상품 수정
  exports.updateFlower = (req, res) => {
   
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.flowerId;
    const { name, price, color, isSoldOut } = req.body;
  
    let query = 'UPDATE flower SET name = ?, price = ?, color = ?, isSoldOut = ?';
    const values = [name, price, color, isSoldOut];

    // 새로운 사진 파일이 업로드되었는지 확인
    if (req.file) {
      query += ', photo = ?';
      values.push(req.file.filename);
    }

    query += ' WHERE flower_id = ? AND seller_id = ?';
    values.push(flowerId, sellerId);

    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '상품 정보를 수정하지 못했습니다.' });
      } else {
        res.redirect('/seller/flowers');
      }
    });
  };
  
  // 상품 삭제
  exports.deleteFlower = (req, res) => {
    const sellerId = req.session.user.id; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.flowerId;
  
    const query = 'DELETE FROM flower WHERE flower_id = ? AND seller_id = ?';
    const values = [flowerId];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: '상품을 삭제하지 못했습니다' });
      } else {
        if (result.affectedRows === 0) {
          res.render('error', { message: 'Flower not found' });
        } else {
          res.redirect('/seller/flowers');
        }
      }
    });
  };
  

