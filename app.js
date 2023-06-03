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
  

//---유진---
const session = require('express-session');
const flowersRouter = require('./routes/seller/flowers.route');
const NoticesRouter = require('./routes/seller/notices.route');
//const StoreRouter = require('./routes/seller/store.route');
const OrdersRouter = require('./routes/seller/orders.route'); // 주문 관련 라우터 추가
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mysql = require('mysql');

const { saveSellerIdToSession, ensureAuthenticated } = require('./middlewares/auth');
const noticesController = require('././controllers/seller/notices.controller'); // 공지사항 컨트롤러 추가
const ordersController = require('././controllers/seller/orders.controller'); // 주문 컨트롤러 추가
const flowersController = require('././controllers/seller/flowers.controller'); // 상품 컨트롤러 추가
const storeController = require('././controllers/seller/store.controller'); // 매장 컨트롤러 추가

//-------------------------------------------------

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: 'localhost',
  user: 'sungshin',
  password: 'tjdtls!',
  database: 'FLOWN'
});


// 세션 설정
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(saveSellerIdToSession); // 판매자 로그인 정보를 세션에 저장하는 미들웨어 등록

app.use(ensureAuthenticated);


//------------------------------------------

// 판매자 공지사항 라우터
app.use('/seller/notices', NoticesRouter);

// 판매자 매장페이지 라우터 -> 매장페이지 그냥 불러오는 거라서 라우트 생성하지 않았음! (url 리다이렉션 구현하기)
//app.use('/seller/store', StoreRouter);

// 판매자 주문확인 라우터
app.use('/seller/orders', OrdersRouter);

// 판매자 상품관리 라우터
app.use('/seller/flowers', flowersRouter);



//--------------------------------------------

// 판매자 마이페이지 - 상품관리


    // 판매자 상품 목록 조회 (상품 관리 페이지로 이동)
app.get('/seller/flowers', ensureAuthenticated, (req, res) => {
  const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용

  // 판매자 상품 목록 조회 로직
  const query = 'SELECT * FROM flower WHERE seller_id = ?';
  const values = [sellerId];

  pool.query(query, values, (err, rows) => {
    if (err) {
      console.log(err);
      res.render('error', { message: 'An error occurred' });
    } else {
      // 조회된 상품 목록을 판매자 상품 목록 페이지로 렌더링
      res.render('seller/flowers', { flowers: rows });
    }
  });
});
    

    // 상품 관리 - 상품 등록
        // 상품 등록 페이지로 이동
app.get('/seller/flowers/create', ensureAuthenticated, (req, res) => {
    res.render('seller/create-flower');
  });
  
  // 상품 등록 처리
  app.post('/seller/flowers', ensureAuthenticated, upload.single('image'), (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  
    // 상품 정보 추출
    const { name, price, color, isSoldOut, photo } = req.body;
  
    // 상품 이미지 파일 경로 추출
    const imagePath = req.file.path;
  
    // 상품 등록 로직
    const query = 'INSERT INTO flower (seller_id, name, price, color, isSoldOut, photo, image_path) VALUES (?, ?, ?, ?, ?)';
    const values = [sellerId, name, price, color, isSoldOut, photo, imagePath];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/flowers');
      }
    });
  });


    // 상품 관리 - 상품 수정
        // 상품 수정 페이지로 이동
app.get('/seller/flowers/:flowerId/edit', ensureAuthenticated, (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.flowerId;
  
    // 상품 정보 조회 로직
    const query = 'SELECT * FROM flower WHERE id = ? AND seller_id = ?';
    const values = [flowerId, sellerId];
  
    pool.query(query, values, (err, rows) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        if (rows.length === 0) {
          res.render('error', { message: 'Unauthorized' });
        } else {
          const flower = rows[0];
          res.render('seller/edit-flower', { flower });
        }
      }
    });
  });
  
  // 상품 수정 처리
app.put('/seller/flowers/:flowerId', ensureAuthenticated, upload.single('image'), (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.flowerId;
  
    // 상품 정보 추출
    const { name, price, color, isSoldOut, photo } = req.body;
  
    // 상품 이미지 파일 경로 추출
    const imagePath = req.file ? req.file.path : null;
  
    // 상품 수정 로직
    const query = 'UPDATE flower SET name = ?, price = ?, color = ?, isSoldOut = ?, photo = ?, image_path = ? WHERE id = ? AND seller_id = ?';
    const values = [name, price, color, isSoldOut, photo, imagePath, flowerId, sellerId];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.redirect('/seller/flowers');
      }
    });
  });
  
 
    // 상품 관리 - 상품 삭제
        // 상품 삭제 처리
app.delete('/seller/flowers/:flowerId', ensureAuthenticated, (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
    const flowerId = req.params.flowerId;
  
    // 상품 삭제 로직
    const query = 'DELETE FROM flower WHERE id = ? AND seller_id = ?';
    const values = [flowerId, sellerId];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred' });
      } else {
        res.sendStatus(200);
      }
    });
  });



// 판매자 마이페이지 - 주문확인

// 주문 목록 확인
app.get('/seller/orders', ensureAuthenticated, (req, res) => {
  const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용

  // 주문 목록 조회 로직
  const query = 'SELECT * FROM orders WHERE seller_id = ?';
  const values = [sellerId];

  pool.query(query, values, (err, rows) => {
    if (err) {
      console.log(err);
      res.render('error', { message: 'An error occurred' });
    } else {
      // 조회된 주문 목록을 판매자 주문 목록 페이지로 렌더링
      res.render('seller/orders', { orders: rows });
    }
  });
});

// 주문 상태 등록
app.post('/seller/orders/:orderId', ensureAuthenticated, (req, res) => {
  const sellerId = req.session.sellerId; // 세션에 저장된 판매자 ID를 사용
  const orderId = req.params.orderId;
  const status = req.body.status;

  // 주문 상태 업데이트 로직
  const query = 'UPDATE orders SET status = ? WHERE id = ? AND seller_id = ?';
  const values = [status, orderId, sellerId];

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
});

// 판매자 마이페이지 - 공지사항

// 공지사항 목록 가져오기
app.get('/seller/notices', noticesController.getNotices);

// 공지사항 등록
app.post('/seller/notices', noticesController.addNotice);

// 공지사항 수정
app.put('/seller/notices/:noticeId', noticesController.updateNotice);

// 공지사항 삭제
app.delete('/seller/notices/:noticeId', noticesController.deleteNotice);



// 판매자 마이페이지 - 매장페이지 (조회)

// 판매자 매장 페이지 조회
app.get('/seller/store', storeController.getStorePage);

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.set('views', './view');


//---------------
//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Passport.js 설정
passport.use(new LocalStrategy(
  function(username, password, done) {
    // 사용자 인증 로직을 구현
    // ...
  }
));

// 사용자 인증 후 세션에 사용자 ID 저장
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// 세션에서 사용자 ID를 읽어 사용자 객체 조회
passport.deserializeUser(function(id, done) {
  // 사용자 객체 조회 로직을 구현
  // ...
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Passport.js 초기화 및 세션 사용 설정
app.use(passport.initialize());
app.use(passport.session());

// middlewares/auth.js에서 미들웨어를 불러옴
//const { ensureAuthenticated } = require('./middlewares/auth');

// 로그인 라우트
app.post('/login', passport.authenticate('local', {
  successRedirect: '/protected-route',
  failureRedirect: '/login',
}));

// 인증된 사용자만 접근 가능한 라우트
app.get('/protected-route', ensureAuthenticated, (req, res) => {
  // 필요한 로직을 작성하세요
});

// ----- 기타 라우트 및 설정 -----

// 서버 시작
//app.listen(3000, () => {
 // console.log('Server is running on port 3000');
//});
//-------------------








// 서버 실행
//app.listen(3000, () => {
//  console.log('Server is running on port 3000');
//});
//-------------------------------------------------

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});