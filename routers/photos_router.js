var globalVar = require('./routesMain.js');

globalVar.routers.route('/view-photos').get(globalVar.checkLogin, globalVar.photosImport.photosGet);
globalVar.routers.route('/delete-photo').get(globalVar.checkLogin, globalVar.photosImport.deletephotosGet);




module.exports = globalVar.routers;