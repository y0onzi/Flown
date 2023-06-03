const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const userDao = require('../../models/User');

const userController = {

    registerBuyer: async(req,res)=>{
      console.log(req.body);
        const errorMessages = {};
        const result = validationResult(req);
      console.log("1");
        if (!result.isEmpty()) {
           result.array().forEach(error => {
              errorMessages[error.path] = error.msg;
          });
          return res.status(400).json({ error: '회원가입 오류가 발생했습니다.' });
        }
        console.log("2");

       const { id, password, name, phoneNumber } = req.body;

        // 비밀번호 암호화
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // 유저 등록
        userDao.registerBuyer(id, hashedPassword, name, phoneNumber);
        return res.status(200).json();
    },

  registerSeller: async(req,res)=>{
      const errorMessages = {};
      const result = validationResult(req);
    
      if (!result.isEmpty()) {
         result.array().forEach(error => {
            errorMessages[error.path] = error.msg;
        });
        return res.status(400).json({ errors: errorMessages });
      }

      const { id, password, storeName, ownerName, businessNumber, storePhoneNumber, 
        address_city, address_district, address_dong, address_detail} = req.body;

      // 비밀번호 암호화
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 유저 등록
      userDao.registerSeller(id, hashedPassword, storeName, ownerName, businessNumber, storePhoneNumber, address_city, address_district, address_dong, address_detail);
      return res.status(200).json();
  },

  login: async(req,res)=>{
   // console.log(req.body);
        //로그인 성공, 실패 여부 
        const { id, password, user } = req.body;

        let hashedPassword;
        if(user == "개인로그인"){
           hashedPassword = await userDao.loginBuyer(id);
        }else if(user == "사업자로그인"){
           hashedPassword = await userDao.loginSeller(id);
        }

        if(hashedPassword === null){
            console.log("아이디 틀림");
        }else{
            const isPasswordValid = await bcrypt.compare(password, hashedPassword);
            console.log(isPasswordValid);

             if(isPasswordValid){
             console.log("로그인 성공");
            
             if(user == "개인로그인"){
              req.session.user = {
                user: "buyer",
                id: id
            };
             }else if(user == "사업자로그인"){
              req.session.user = {
                user: "seller",
                id: id
            };
             }
            // 세션 데이터 저장
            req.session.save((err) => {
            if (err) {
              console.error('Failed to save session:', err);
            } else {
              console.log('Session saved successfully');
              return res.status(200).json();
            }
          });          
          }else{
        console.log("로그인 실패");
         }
    }

  }
}

module.exports = userController;