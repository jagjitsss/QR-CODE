var globalVar = require('./routesMain.js');

globalVar.routers.route('/login').get(globalVar.authImport.loginGet);
globalVar.routers.route('/forgot-password').get(globalVar.authImport.forgotPasswordGet);
globalVar.routers.route('/login').post(globalVar.authImport.userLoginPost);
globalVar.routers.route('/logout').get(globalVar.authImport.userLogout);


module.exports = globalVar.routers;