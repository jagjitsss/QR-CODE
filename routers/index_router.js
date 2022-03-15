var globalVar = require('./routesMain.js');

globalVar.routers.route('/').get(globalVar.indexImport.dashboardGet);


module.exports = globalVar.routers;