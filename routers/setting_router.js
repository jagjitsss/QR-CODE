var globalVar = require('./routesMain.js');

globalVar.routers.route('/setting').get(globalVar.settingImport.settingGet);

module.exports = globalVar.routers;