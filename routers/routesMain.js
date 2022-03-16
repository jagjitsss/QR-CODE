const express = require('express');
const routers = express.Router();

const checkLogin = require('../middlewares/check_login.js');
const authImport = require('../controller/auth.js');
const userImport = require('../controller/user.js');
const qrCodesImport = require('../controller/qrCodes.js');
const indexImport = require('../controller/index.js');
const settingImport = require('../controller/setting.js');
const locationImport = require('../controller/location.js');


var globalVariable = {};
globalVariable.routers = routers;
globalVariable.checkLogin = checkLogin;
globalVariable.authImport = authImport;
globalVariable.userImport = userImport;
globalVariable.qrCodesImport = qrCodesImport;
globalVariable.indexImport = indexImport;
globalVariable.settingImport = settingImport;
globalVariable.locationImport = locationImport;


module.exports = globalVariable;