var globalVar = require('./routesMain.js');

globalVar.routers.route('/qr-codes').get(globalVar.qrCodesImport.qrCodesGet);
globalVar.routers.route('/add-qr-code').get(globalVar.qrCodesImport.addQrCodesGet);
globalVar.routers.route('/edit-qr-code').get(globalVar.qrCodesImport.editQrCodesGet);



module.exports = globalVar.routers;