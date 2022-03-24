const express = require('express');
const routers = express.Router();

const checkLogin = require('../middlewares/check_login.js');
const authImport = require('../controller/auth.js');
const vehicleImport = require('../controller/vehicle.js');
const qrCodesImport = require('../controller/qrCodes.js');
const indexImport = require('../controller/index.js');
const settingImport = require('../controller/setting.js');
const locationImport = require('../controller/location.js');
const photosImport = require('../controller/photos.js');


var globalVariable = {};
globalVariable.routers = routers;
globalVariable.checkLogin = checkLogin;
globalVariable.authImport = authImport;
globalVariable.vehicleImport = vehicleImport;
globalVariable.qrCodesImport = qrCodesImport;
globalVariable.indexImport = indexImport;
globalVariable.settingImport = settingImport;
globalVariable.locationImport = locationImport;
globalVariable.photosImport = photosImport;



module.exports = globalVariable;