const express = require('express');
const app = express();
const db = require('./config/database');
require("dotenv").config();
const layouts= require("express-ejs-layouts");
const storeController = require('./controllers/store/storeController');
const bouquetController = require('./controllers/store/bouquetController');

app.set('port', process.env.PORT || 3000);

const database = require('./database/database');
const userRouter = require('./routes/user/userRouter');
const buyerRouter = require('./routes/buyer/buyerRouter');
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

// 가게 페이지 라우팅
app.get('/store/:sellerId', storeController.index);
app.get('/bouquet', bouquetController.addToBouquet);

app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());
  
app.use(userRouter);
app.use(buyerRouter);
  

//---판매자 마이페이지 관련---
const flowersRouter = require('./routes/seller/flowers.route');
const NoticesRouter = require('./routes/seller/notices.route');
const OrdersRouter = require('./routes/seller/orders.route');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


//const { ensureAuthenticated } = require('./middlewares/auth');
const noticesController = require('./controllers/seller/notices.controller');
const ordersController = require('./controllers/seller/orders.controller'); 
const flowersController = require('./controllers/seller/flowers.controller'); 


// 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(ensureAuthenticated);


// 판매자 공지사항 라우터
app.use('/seller/notices', NoticesRouter);

// 판매자 주문확인 라우터
app.use('/seller/orders', OrdersRouter);

// 판매자 상품관리 라우터
app.use('/seller/flowers', flowersRouter);


// 판매자 마이페이지 - 상품 관리
// 판매자 상품 목록 조회 (상품 관리 페이지로 이동)
app.get('/seller/flowers', /*ensureAuthenticated,*/ flowersController.getFlowers);

// 상품 등록 처리
app.post('/seller/flowers', upload.single('photo'), flowersController.addFlower);

// 상품 수정 처리
app.patch('/seller/flowers/update/:flowerId', upload.single('photo'),flowersController.updateFlower);

// 상품 삭제 처리
app.delete('/seller/flowers/delete/:flowerId', flowersController.deleteFlower);



// 판매자 마이페이지 - 주문확인
// 주문 목록 확인
app.get('/seller/orders', ordersController.getOrders);

// 주문 상태 등록
app.post('/seller/orders/:orderId', ordersController.updateOrderStatus);


// 판매자 마이페이지 - 공지사항
// 공지사항 목록 가져오기
app.get('/seller/notices', noticesController.getNotices);

// 공지사항 등록
app.post('/seller/notices', noticesController.addNotice);

// 공지사항 수정
app.put('/seller/notices/:noticeId', noticesController.updateNotice);

// 공지사항 삭제
app.delete('/seller/notices/:noticeId', noticesController.deleteNotice);

//---판매자 마이페이지 끝---


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});