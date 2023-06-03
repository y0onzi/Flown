//searchController.js

const searchModel = require('../../models/searchModel');

exports.getSearchPage = (req, res) => {
  res.render('searchView', { cities: searchModel.getCities() });
};

exports.getRegions = (req, res) => {
  const city = req.query.city;
  const regions = searchModel.getRegions(city);
  res.json({ regions });
};

exports.getLocations = (req, res) => {
  const region = req.query.region;
  const locations = searchModel.getLocations(region);
  res.json({ locations });
};

exports.searchStores = (req, res) => {
  const city = req.body.city;
  const region = req.body.region;
  const location = req.body.location;

  const stores = searchModel.searchStores(city, region, location);
  res.render('searchView', { cities: searchModel.getCities(), stores });
};


// restart

const searchModel = require('../models/searchModel');

exports.getSearchPage = async (req, res) => {
  try {
    const cities = await searchModel.getCities();
    res.render('searchView', { cities: cities, regions: [], locations: [], stores: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cities' });
  }
};

exports.getRegions = async (req, res) => {
  const city = req.query.city;

  try {
    const regions = await searchModel.getRegions(city);
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve regions' });
  }
};

exports.getLocations = async (req, res) => {
  const region = req.query.region;

  try {
    const locations = await searchModel.getLocations(region);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve locations' });
  }
};

exports.searchStores = async (req, res) => {
  const city = req.body.city;
  const region = req.body.region;
  const location = req.body.location;

  try {
    const stores = await searchModel.searchStores(city, region, location);
    res.render('searchView', { cities: [], regions: [], locations: [], stores: stores });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search stores' });
  }
};