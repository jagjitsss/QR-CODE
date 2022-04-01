var dbQuery = require("../db/dev/dbQuery");
var moment = require('moment');

module.exports.usersGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_vehicle`];
    var dbrespUsers = await dbQuery.query(query, table);
    
    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle",
        users:dbrespUsers
    }
    res.render("pages/vehicle/list", renderPageData);
}

module.exports.addUserGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);

    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle",
        cities: dbrespCity
    }
    res.render("pages/vehicle/add",renderPageData);
}

module.exports.addUserPost = async function (req, res, next) {
     console.log(req.body.isActive);
    if(req.body.isActive) {
        req.body.isActive = 1;
    }
     var query = "INSERT INTO  ?? SET  ?";
     var table = ["tbl_vehicle", req.body];
     var dbResponse = await dbQuery.query(query, table);
     res.redirect('/vehicle');
}

module.exports.editUserGet = async function (req, res, next) {
    if(!req.query.id) {
        res.redirect('/cities');
        return false;
    }
    var query1 = `SELECT * FROM ?? ORDER BY id DESC`
    var table2 = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query1, table2);


    var query = `SELECT * FROM tbl_vehicle where ?? = ?`;
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle",
        user:dbResponse,
        cities: dbrespCity
    }
    res.render("pages/vehicle/edit",renderPageData);
}



module.exports.editUserPost = async function (req, res, next) {
    if(!req.body.other_vehicle_type) {
        req.body.other_vehicle_type = "";
    } 
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_vehicle", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/vehicle');
}

module.exports.updateIsActive = async function (req, res, next) {
    
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_vehicle", req.query, `id`, req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.send({status:true,data:dbResponse, message:"Updated"})
}

module.exports.getVehicleById = async function (req, res, next) {
    
    var query_g = `SELECT lat_lng FROM ?? where  ??= ?`
    var table_g = [`tbl_vehicle`, `id`, req.query.id];
    var vehicleData = await dbQuery.query(query_g, table_g);
    res.send({status:true,data:vehicleData})
}


module.exports.deleteUserPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_vehicle` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/vehicle');
}


module.exports.viewUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"View Vehicle",
        vehicle_id: req.query.id
    }
    res.render("pages/vehicle/view",renderPageData);
}

module.exports.trackUserGet = async function (req, res, next) {
    var query_g = `SELECT id FROM ?? where  ??= ?`
    var table_g = [`tbl_checkpoint`, `vehicle_id`, req.query.id];
    var checkPointData = await dbQuery.query(query_g, table_g);
    console.log(checkPointData.length);
    var checkPointsId = [];
    for(let i = 0; i < checkPointData.length; i++) {
        checkPointsId.push(checkPointData[i].id);
    }
    var check_point_id = checkPointsId.toString();
    if(req.query.d) {
        var query_v = `SELECT checkpoint_location,updated_on FROM ?? where  checkpoint_id IN (?) AND updated_on IS NOT NULL AND DATE(updated_on) = '`+req.query.d+`'`
    } else {
        var query_v = `SELECT checkpoint_location,updated_on FROM ?? where  checkpoint_id IN (?) AND updated_on IS NOT NULL AND DATE(updated_on) = '`+moment().format('YYYY-MM-DD')+`'`
    }
  
    var table_v = [`tbl_checkpoint_qr_code`, check_point_id];
    var checkpointsData = await dbQuery.query(query_v, table_v);
    console.log(checkpointsData)

    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle",
        vehicle_id: req.query.id,
        checkpointsData:checkpointsData,
        date:req.query.d ?req.query.d :moment().format('YYYY-MM-DD')
    }
    res.render("pages/vehicle/track",renderPageData);
}



