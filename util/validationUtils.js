
const validateId = async (tableName, id) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    const [rows] = await db.query(query, [id]);

    const isValid = rows.length > 0;
    return isValid;
  } catch (error) {
    console.error(`Error validating ${tableName} ID:`, error);
    throw error;
  }
};

module.exports = {
  validateId
  // 다른 모델 메서드들 추가 
};
