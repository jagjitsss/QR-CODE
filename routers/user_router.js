var globalVar = require('./routesMain.js');

globalVar.routers.route('/users').get(globalVar.checkLogin, globalVar.userImport.usersGet);
globalVar.routers.route('/add-user').get(globalVar.checkLogin, globalVar.userImport.addUserGet);
globalVar.routers.route('/edit-user').get(globalVar.checkLogin, globalVar.userImport.editUserGet);
globalVar.routers.route('/view-user').get(globalVar.checkLogin, globalVar.userImport.viewUserGet);
globalVar.routers.route('/track-user').get(globalVar.checkLogin, globalVar.userImport.trackUserGet);

globalVar.routers.route('/add-user').post(globalVar.checkLogin, globalVar.userImport.addUserPost);
globalVar.routers.route('/edit-user').post(globalVar.checkLogin, globalVar.userImport.editUserPost);
globalVar.routers.route('/delete-user').get(globalVar.checkLogin, globalVar.userImport.deleteUserPost);
globalVar.routers.route('/update-is-active').get(globalVar.checkLogin, globalVar.userImport.updateIsActive);


module.exports = globalVar.routers;