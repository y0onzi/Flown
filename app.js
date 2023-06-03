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
  

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});