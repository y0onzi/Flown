const express = require('express');
const app = express();
const db = require('./config/database');
require("dotenv").config();
const layouts= require("express-ejs-layouts");

app.set('port', process.env.PORT || 3000);

const database = require('./database/database');

//===============라우터 추가============================//
const userRouter = require('./routes/user/userRouter');
const buyerRouter = require('./routes/buyer/buyerRouter');


const searchRouter = require('./routes/map/searchRoute'); // 가게 검색 라우터
app.use('/search', searchRouter);  // 가게 검색 라우터


const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var sessionStore = new MySQLStore(database.options);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

//애플리케이션과 템플릿 엔진의 연결
app.set('view engine', 'ejs');
app.set('views', './views');


//===================라우터 연결================//
app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());
  
app.use(userRouter);
app.use(buyerRouter);
  

//---유진---
const flowersRouter = require('./routes/seller/flowers.route');
const NoticesRouter = require('./routes/seller/notices.route');
//const StoreRouter = require('./routes/seller/store.route');
const OrdersRouter = require('./routes/seller/orders.route');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mysql = require('mysql');

const { saveSellerIdToSession, ensureAuthenticated } = require('./middlewares/auth');
const noticesController = require('././controllers/seller/notices.controller');
const ordersController = require('././controllers/seller/orders.controller'); 
const flowersController = require('././controllers/seller/flowers.controller'); 
const storeController = require('././controllers/seller/store.controller'); 


// 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(saveSellerIdToSession);
app.use(ensureAuthenticated);


// //------------------------------------------

// // 판매자 공지사항 라우터
// app.use('/seller/notices', NoticesRouter);

// 판매자 매장페이지 라우터 -> 매장페이지 그냥 불러오는 거라서 라우트 생성하지 않았음! (url 리다이렉션 구현하기?)
//app.use('/seller/store', StoreRouter);

// // 판매자 주문확인 라우터
// app.use('/seller/orders', OrdersRouter);

// // 판매자 상품관리 라우터
// app.use('/seller/flowers', flowersRouter);

//--------------------------------------------
// 판매자 상품 목록 조회 (상품 관리 페이지로 이동)
app.get('/seller/flowers', ensureAuthenticated, sellerController.renderFlowerList);

// 상품 등록 페이지로 이동
app.get('/seller/flowers/create', ensureAuthenticated, sellerController.renderCreateFlower);

// 상품 등록 처리
app.post('/seller/flowers', ensureAuthenticated, upload.single('image'), sellerController.createFlower);

// 상품 수정 페이지로 이동
app.get('/seller/flowers/:flowerId/edit', ensureAuthenticated, sellerController.renderEditFlower);

// 상품 수정 처리
app.put('/seller/flowers/:flowerId', ensureAuthenticated, upload.single('image'), sellerController.updateFlower);

// 상품 삭제 처리
app.delete('/seller/flowers/:flowerId', ensureAuthenticated, sellerController.deleteFlower);



// 판매자 마이페이지 - 주문확인
// 주문 목록 확인
app.get('/seller/orders', ensureAuthenticated, sellerController.getOrders);

// 주문 상태 등록
app.post('/seller/orders/:orderId', ensureAuthenticated, sellerController.updateOrderStatus);

  pool.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error', { message: 'An error occurred' });
    } else {
      if (result.affectedRows === 0) {
        // 업데이트된 행이 없으면 해당 주문이 판매자에게 속하지 않음
        res.render('error', { message: 'Unauthorized' });
      } else {
        // 주문 상태 업데이트 성공
        res.redirect('/seller/orders');
      }
    }
  });


// // 판매자 마이페이지 - 공지사항

// // 공지사항 목록 가져오기
// app.get('/seller/notices', noticesController.getNotices);

// // 공지사항 등록
// app.post('/seller/notices', noticesController.addNotice);

// // 공지사항 수정
// app.put('/seller/notices/:noticeId', noticesController.updateNotice);

// // 공지사항 삭제
// app.delete('/seller/notices/:noticeId', noticesController.deleteNotice);



// 판매자 마이페이지 - 매장페이지
// 판매자 매장 페이지 조회
app.get('/seller/store', storeController.getStorePage);






// 서버 실행
//app.listen(3000, () => {
//  console.log('Server is running on port 3000');
//});
//-------------------------------------------------

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});