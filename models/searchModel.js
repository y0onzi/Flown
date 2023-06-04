const db = require('../config/database');

exports.getSearchResults = async (city, district, neighborhood) => {
  try {
    const query = `SELECT * FROM seller_info WHERE address_city = '${city}' AND address_district = '${district}' AND address_dong = '${neighborhood}'`;

    const connection = await db.getConnection(); // 커넥션 풀에서 연결 획득
    const [results] = await connection.query(query);
    connection.release(); // 연결 반환

    return results;
  } catch (err) {
    console.error('쿼리 실행 오류:', err);
    throw err;
  }
};

