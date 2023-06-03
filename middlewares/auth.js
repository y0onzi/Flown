// middlewares/auth.js

// 판매자가 권한을 가지고 있는지 확인하는 미들웨어
// 권한이 없는 경우 에러 페이지를 표시한다.
exports.ensureAuthorized = (req, res, next) => {
    // 권한 확인 로직
    // 예시로 'seller' 권한이 있는지 확인하는 코드를 작성하였습니다.
    const authorized = checkSellerAuthorization(req.session.sellerId);
  
    if (authorized) {
      // 판매자가 권한을 가지고 있으면 다음 미들웨어로 이동
      return next();
    }
  
    // 권한이 없는 경우 에러 페이지를 표시
    res.render('error', { message: 'Unauthorized' });
  };
  
  // 판매자 권한 확인 함수
  function checkSellerAuthorization(sellerId) {
    // 판매자의 권한을 확인하는 로직을 구현
    // 예시로 sellerId가 'admin'인 경우에만 권한이 있다고 가정
    return sellerId === 'admin';
  }
  
  // 판매자 ID 세션에 저장하는 미들웨어
  exports.saveSellerIdToSession = (req, res, next) => {
    // 판매자 ID 세션에 저장하는 로직 구현
    req.session.sellerId = '판매자 아이디';
  
    next();
  }
  
  // 인증된 사용자인지 확인하는 미들웨어
  exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트 또는 에러 처리
    res.redirect('/login');
  };
  