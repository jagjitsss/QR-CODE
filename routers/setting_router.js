var globalVar = require('./routesMain.js');

globalVar.routers.route('/setting').get( globalVar.settingImport.settingGet);
globalVar.routers.route('/change-password').post( globalVar.settingImport.changePassword);

module.exports = globalVar.routers;