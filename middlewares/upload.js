const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 파일 저장 경로 설정
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 파일 이름 설정
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
