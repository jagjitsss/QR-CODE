var globalVar = require('./routesMain.js');

globalVar.routers.route('/vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.usersGet);
globalVar.routers.route('/add-vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.addUserGet);
globalVar.routers.route('/edit-vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.editUserGet);
globalVar.routers.route('/view-vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.viewUserGet);
globalVar.routers.route('/track-vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.trackUserGet);

globalVar.routers.route('/add-vehicle').post(globalVar.checkLogin, globalVar.vehicleImport.addUserPost);
globalVar.routers.route('/edit-vehicle').post(globalVar.checkLogin, globalVar.vehicleImport.editUserPost);
globalVar.routers.route('/delete-vehicle').get(globalVar.checkLogin, globalVar.vehicleImport.deleteUserPost);
globalVar.routers.route('/update-is-active').get(globalVar.checkLogin, globalVar.vehicleImport.updateIsActive);


module.exports = globalVar.routers;