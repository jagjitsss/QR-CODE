var globalVar = require('./routesMain.js');

globalVar.routers.route('/reports').get(globalVar.checkLogin, globalVar.reportsImport.reportGet);

module.exports = globalVar.routers;