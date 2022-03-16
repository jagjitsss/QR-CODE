var globalVar = require('./routesMain.js');

globalVar.routers.route('/').get(globalVar.checkLogin, globalVar.indexImport.dashboardGet);


module.exports = globalVar.routers;