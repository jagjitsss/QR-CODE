var globalVar = require('./routesMain.js');

globalVar.routers.route('/view-photos').get(globalVar.checkLogin, globalVar.photosImport.photosGet);




module.exports = globalVar.routers;