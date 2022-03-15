const express = require('express');
const routers = express.Router();


const authImport = require('../controller/auth.js');
const userImport = require('../controller/user.js');
const qrCodesImport = require('../controller/qrCodes.js');
const indexImport = require('../controller/index.js');
const settingImport = require('../controller/setting.js');


var globalVariable = {};
globalVariable.routers = routers;
globalVariable.authImport = authImport;
globalVariable.userImport = userImport;
globalVariable.qrCodesImport = qrCodesImport;
globalVariable.indexImport = indexImport;
globalVariable.settingImport = settingImport;


module.exports = globalVariable;