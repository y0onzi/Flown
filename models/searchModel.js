//searchModel.js

const db = require('../config/database');


exports.getCities = async () => {
  try {
    const query = 'SELECT * FROM cities';
    const results = await db.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getRegions = async (city) => {
  try {
    const query = 'SELECT * FROM regions WHERE city = ?';
    const results = await db.query(query, [city]);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.getLocations = async (region) => {
  try {
    const query = 'SELECT * FROM locations WHERE region = ?';
    const results = await db.query(query, [region]);
    return results;
  } catch (error) {
    throw error;
  }
};

exports.searchStores = async (city, region, location) => {
  try {
    const query = 'SELECT * FROM stores WHERE city = ? AND region = ? AND location = ?';
    const results = await db.query(query, [city, region, location]);
    return results;
  } catch (error) {
    throw error;
  }
};
