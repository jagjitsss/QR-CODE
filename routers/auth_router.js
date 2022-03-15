var globalVar = require('./routesMain.js');

globalVar.routers.route('/login').get(globalVar.authImport.loginGet);
globalVar.routers.route('/forgot-password').get(globalVar.authImport.forgotPasswordGet);


module.exports = globalVar.routers;