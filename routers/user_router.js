var globalVar = require('./routesMain.js');

globalVar.routers.route('/users').get(globalVar.userImport.usersGet);
globalVar.routers.route('/add-user').get(globalVar.userImport.addUserGet);
globalVar.routers.route('/edit-user').get(globalVar.userImport.editUserGet);
globalVar.routers.route('/view-user').get(globalVar.userImport.viewUserGet);


module.exports = globalVar.routers;