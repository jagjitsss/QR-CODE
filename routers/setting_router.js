var globalVar = require('./routesMain.js');

globalVar.routers.route('/setting').get(globalVar.checkLogin, globalVar.settingImport.settingGet);
globalVar.routers.route('/change-password').post(globalVar.checkLogin, globalVar.settingImport.changePassword);

module.exports = globalVar.routers;