const route = require('express').Router();
const siteController = require('../controllers/SiteController');
route.get('/', siteController.home);
module.exports = route;
