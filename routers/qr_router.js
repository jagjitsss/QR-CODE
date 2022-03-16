var globalVar = require('./routesMain.js');

globalVar.routers.route('/qr-codes').get(globalVar.checkLogin, globalVar.qrCodesImport.qrCodesGet);
globalVar.routers.route('/add-qr-code').get(globalVar.checkLogin, globalVar.qrCodesImport.addQrCodesGet);
globalVar.routers.route('/edit-qr-code').get(globalVar.checkLogin, globalVar.qrCodesImport.editQrCodesGet);

globalVar.routers.route('/add-qr-code').post(globalVar.checkLogin, globalVar.qrCodesImport.addQrCodesPost);
globalVar.routers.route('/update-qr-code').post(globalVar.checkLogin, globalVar.qrCodesImport.updateQrCodesPost);
globalVar.routers.route('/delete-qr-code').get(globalVar.checkLogin, globalVar.qrCodesImport.deleteQrCodesPost);




module.exports = globalVar.routers;