// middlewares/auth.js

// 판매자가 권한을 가지고 있는지 확인하는 미들웨어 = 타 판매자의 마이페이지에는 접근 권한 X
  exports.ensureAuthorized = (req, res, next) => {
    const loggedInSellerId = req.session.sellerId; // 로그인한 판매자 아이디
    const requestedSellerId = req.params.sellerId; // 요청한 판매자 아이디
  
    // 현재 로그인한 판매자와 요청한 아이디가 일치하지 않으면 접근 거부
    if (loggedInSellerId !== requestedSellerId) {
      return res.status(403).render('error', { message: 'Access denied' });
    }
  
    // 개별 판매자의 마이페이지를 표시하거나 필요한 로직 수행
    next();
  };


  // 판매자 ID 세션에 저장하는 미들웨어
  exports.saveSellerIdToSession = (req, res, next) => {
    // 판매자 ID 세션에 저장하는 로직 구현
    req.session.sellerId = '판매자 아이디';
  
    next();
  };
  
  
  // 인증된 사용자인지 확인하는 미들웨어 = 판매자의 로그인 여부 확인
  exports.ensureAuthenticated = (req, res, next) => {
    // 세션에서 정보 확인하여 인증 여부 판단
    if (req.session.isAuthenticate === true) {
      return next();
    }
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트 또는 에러 처리
    res.redirect('/login');
  };
  
  // 개별 판매자의 마이페이지 렌더링
  exports.renderMyPage = (req, res) => {
    const sellerId = req.session.sellerId; // 세션에 저장된 판매자 아이디 가져오기
  
    // 개별 판매자의 마이페이지를 렌더링
    res.render('myPage', { sellerId: sellerId });
  };
