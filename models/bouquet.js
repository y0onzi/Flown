const db = require('../config/database').db;
const validation = require('../util/validationUtils');


module.exports = {
    createBouquet: async (buyerId) => {
      try {
        // 꽃다발 테이블에 꽃다발 생성
        const createBouquetQuery = 'INSERT INTO bouquet (buyer_id, price) VALUES (?, 0)';
        await db.query(createBouquetQuery, [buyerId]);
        console.log('꽃다발 초기화 완료!');
        
  
        // 생성된 꽃다발ID 조회
        const getBouquetIdQuery = 'SELECT LAST_INSERT_ID() AS bouquetId';
        const [rows] = await db.query(getBouquetIdQuery); //배열의 첫 번째 요소를 rows 변수에 할당
        console.log(rows);//확인
        const bouquetId = rows[0].bouquetId;

        console.log("모델에서 부케아이디 확인:" +bouquetId)
        return bouquetId;
      } catch (err) {
        console.error(err);
      }
    },
  
    insertToBouquet : async (bouquetId, flowerId, flowerAmount) => {
      try {

        // 해당 flowerId 유효한지 확인
        const isBouquetIdValid = await validation.validateId('flower', "flower_id", flowerId);
        if (!isBouquetIdValid) {
            throw new Error('Invalid Bouquet ID');
          }

        //해당 flowerId 유효한지 확인
        const isFlowerIdValid = validation.validateId('bouquet', "bouquet_id" , bouquetId)
        if (!isFlowerIdValid) {
            throw new Error('Invalid flower ID');
        }

    
        // 꽃다발 구성 테이블에 꽃 추가
        const addToBouquetQuery = 'INSERT INTO bouquet_configuration (bouquet_id, flower_id, flowerAmount) VALUES (?, ?, ?)';
        await db.query(addToBouquetQuery, [bouquetId, flowerId, flowerAmount]);
        console.log('꽃다발에 꽃 추가 완료!');
      } catch (err) {
        console.error(err);
      }
    }
  };
