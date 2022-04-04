var globalVar = require('./routesMain.js');

globalVar.routers.route('/cities').get(globalVar.checkLogin, globalVar.locationImport.citiesGet);
globalVar.routers.route('/add-city').get(globalVar.checkLogin, globalVar.locationImport.addCityGet);
globalVar.routers.route('/edit-city').get(globalVar.checkLogin, globalVar.locationImport.editCityGet);

globalVar.routers.route('/add-city').post(globalVar.checkLogin, globalVar.locationImport.addCityPost);
globalVar.routers.route('/edit-city').post(globalVar.checkLogin, globalVar.locationImport.editCityPost);
globalVar.routers.route('/delete-city').get(globalVar.checkLogin, globalVar.locationImport.deleteCityPost);

globalVar.routers.route('/locations').get(globalVar.checkLogin, globalVar.locationImport.locationsGet);
globalVar.routers.route('/add-location').get(globalVar.checkLogin, globalVar.locationImport.addLocationsGet);
globalVar.routers.route('/edit-location').get(globalVar.checkLogin, globalVar.locationImport.editLocationsGet);
globalVar.routers.route('/get-locations').get(globalVar.checkLogin, globalVar.locationImport.getlocationsGet);

globalVar.routers.route('/add-location').post(globalVar.checkLogin, globalVar.locationImport.addLocationPost);
globalVar.routers.route('/edit-location').post(globalVar.checkLogin, globalVar.locationImport.editaddLocationPost);
globalVar.routers.route('/delete-location').get(globalVar.checkLogin, globalVar.locationImport.deleteaddLocation);

globalVar.routers.route('/checkpoints').get(globalVar.checkLogin, globalVar.locationImport.checkpointsGet);
globalVar.routers.route('/add-checkpoint').get(globalVar.checkLogin, globalVar.locationImport.addCheckpointGet);
globalVar.routers.route('/edit-checkpoint').get(globalVar.checkLogin, globalVar.locationImport.editCheckpointGet);

globalVar.routers.route('/add-checkpoint').post(globalVar.checkLogin, globalVar.locationImport.addCheckpointPost);
globalVar.routers.route('/delete-checkpoint').get(globalVar.checkLogin, globalVar.locationImport.deleteCheckpointPost);
globalVar.routers.route('/edit-checkpoint').post(globalVar.checkLogin, globalVar.locationImport.editCheckpointPost);

globalVar.routers.route('/track-checkpoints').get(globalVar.checkLogin, globalVar.locationImport.trackCheckpoints);
globalVar.routers.route('/get-location-lat-lng').get(globalVar.checkLogin, globalVar.locationImport.getlocationLatLng);

globalVar.routers.route('/get-by-id-checkpoints').get(globalVar.checkLogin, globalVar.locationImport.checkpointsGetById);

globalVar.routers.route('/delete-checkpoint').post(globalVar.checkLogin, globalVar.locationImport.deleteCheckPoint);



module.exports = globalVar.routers;