var dbQuery = require("../db/dev/dbQuery");
var qrcode = require("qrcode");
module.exports.citiesGet = async function  (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);

    var renderPageData = {
        url:req.url,
        title:"Manage Cities",
        cities: dbrespCity
    }
    res.render("pages/cities/list", renderPageData);
}

module.exports.addCityGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Cities "
    }
    res.render("pages/cities/add", renderPageData);
}

module.exports.addCityPost = async function (req, res, next) {
    var query = "INSERT INTO  ?? SET  ?";
    var table = ["tbl_cities", req.body];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/cities');
}

module.exports.editCityGet = async function (req, res, next) {
    if(!req.query.id) {
        res.redirect('/cities');
        return false;
    }

   var query = `SELECT * FROM tbl_cities where ?? = ?`;
   var table = ['id', req.query.id];
   var dbResponse = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Cities",
        city:dbResponse
    }
    res.render("pages/cities/edit", renderPageData);
}

module.exports.editCityPost = async function (req, res, next) {
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_cities", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/cities');
}

module.exports.deleteCityPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_cities` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/cities');
}


module.exports.locationsGet = async function (req, res, next) {
    var query = `SELECT tbl_locations.*, tbl_cities.city FROM ?? LEFT JOIN tbl_cities ON tbl_locations.city_id = tbl_cities.id ORDER BY id DESC`
    var table = [`tbl_locations`];
    var dbrespCity = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Locations",
        locations: dbrespCity
    }
    res.render("pages/location/list", renderPageData);
}


module.exports.addLocationsGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Locations",
        cities: dbrespCity
    }
    res.render("pages/location/add", renderPageData);
}


module.exports.addLocationPost = async function (req, res, next) {
    var data = { 
        city_id: req.body.city_id,
        location: req.body.location,
        latitude: req.body.latitude,
        lngtitude: req.body.lngtitude,
     };
    var query = "INSERT INTO  ?? SET  ?";
    var table = ["tbl_locations", data];
    var dbResponse = await dbQuery.query(query, table);
    //res.redirect('/locations');

    if(req.body.flag == "qr") {
        res.redirect('/add-qr-code');
    } else {
        res.redirect('/locations');
    }
}



module.exports.editLocationsGet = async function (req, res, next) {
    if(!req.query.id) {
        res.redirect('/cities');
        return false;
    }

   var query = `SELECT * FROM tbl_locations where ?? = ?`;
   var table = ['id', req.query.id];
   var dbResponse = await dbQuery.query(query, table);

   var query = `SELECT * FROM ?? ORDER BY id DESC`
   var table = [`tbl_cities`];
   var dbrespCity = await dbQuery.query(query, table);

   var renderPageData = {
        url:req.url,
        title:"Manage Locations",
        locations:dbResponse,
        cities:dbrespCity
    }
    res.render("pages/location/edit", renderPageData);
}

module.exports.editaddLocationPost = async function (req, res, next) {
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_locations", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/locations');
}

module.exports.deleteaddLocation = async function (req, res, next) {
    var query = "DELETE FROM `tbl_locations` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/locations');
}

module.exports.getlocationsGet = async function (req, res, next) {
    if(!req.query.city_id) {
        res.send({status:false,message:"city_id is required!"})
        return false;
    }
    var query = `SELECT * FROM tbl_locations where ?? = ?`;
    var table = ['city_id', req.query.city_id];
    var dbResponse = await dbQuery.query(query, table);


    var query1 = `SELECT * FROM tbl_vehicle where ?? = ?`;
    var table1 = ['city_id', req.query.city_id];
    var dbResponseVehicle = await dbQuery.query(query1, table1);

    res.send({status:true,location:dbResponse, vehicle:dbResponseVehicle})
}



module.exports.checkpointsGet = async function (req, res, next) {
    var query = `SELECT (SELECT COUNT(*) FROM tbl_checkpoint_qr_code WHERE tbl_checkpoint_qr_code.checkpoint_id = tbl_checkpoint.id) AS check_qr_code,tbl_checkpoint.*, tbl_vehicle.driver_name,tbl_vehicle.vehicle_number,tbl_locations.location as location, tbl_cities.city as city FROM ?? LEFT JOIN tbl_cities ON tbl_cities.id = tbl_checkpoint.city_id LEFT JOIN tbl_locations on tbl_locations.id = tbl_checkpoint.location_id LEFT JOIN tbl_vehicle on tbl_vehicle.id = tbl_checkpoint.vehicle_id ORDER BY checkpoint_no ASC`
    var table = [`tbl_checkpoint`];
    var dbrespCheckPoints = await dbQuery.query(query, table);

    
    var renderPageData = {
        url:req.url,
        title:"Manage Checkpoints",
        checkPoints:dbrespCheckPoints
    }
    res.render("pages/checkpoints/list", renderPageData);
}

module.exports.checkpointsGetById = async function (req, res, next) {
    console.log(req.query);
    var query = `SELECT id FROM ??  WHERE ??=? AND ??=? AND ??=?`
    var table = [`tbl_checkpoint`, `location_id`, req.query.location_id,`city_id`, req.query.city_id,`vehicle_id`, req.query.vehicle_id];

    var dbrespCheckPoints = await dbQuery.query(query, table);
    if(dbrespCheckPoints.length > 0) {
        const result = Object.values(JSON.parse(JSON.stringify(dbrespCheckPoints)));
        var query1 = `SELECT * FROM ?? where  ??= ?`
        var table1 = [`tbl_checkpoint_qr_code`, `checkpoint_id`, result[0].id];
        var dbrespCheckPointsCode = await dbQuery.query(query1, table1);
        console.log(dbrespCheckPointsCode,'dbrespCheckPointsdbrespCheckPointsdbrespCheckPoints');
        res.send({status:true,data:dbrespCheckPointsCode, checkpoint_id:result[0].id});
    } else {
        res.send({status:true,data:[]});

    }

    
}



module.exports.addCheckpointGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);

    var query1 = `SELECT max(id) as checkpoint_no FROM ??;`
    var table1 = [`tbl_checkpoint`];
    var dbrespCheckpointNo = await dbQuery.query(query1, table1);

    var queryU = `SELECT * FROM ?? `;
    var tableU = ['tbl_vehicle'];
    var dbResponseUser = await dbQuery.query(queryU, tableU);
 

    var renderPageData = {
        url:req.url,
        title:"Manage Checkpoints",
        cities:dbrespCity,
        checkpoint_no:dbrespCheckpointNo[0]['checkpoint_no'] ? parseInt(dbrespCheckpointNo[0]['checkpoint_no']) + 1 : 1,
        users:dbResponseUser
    }
    res.render("pages/checkpoints/add", renderPageData);
}

module.exports.addCheckpointPost = async function (req, res, next) {

   if(req.body.checkpoint_id) {

   

    const myPromise = new Promise(async(resolve, reject) =>  {
        var checkPoints = JSON.parse(req.body.checkPoints);
            checkPoints.forEach(async(item) => {
                var query_g = `SELECT id FROM ?? where  ??= ?`
                var table_g = [`tbl_checkpoint_qr_code`, `or_code_id`, item.or_code_id];
                var check_dbResponse_checkpoint = await dbQuery.query(query_g, table_g);
                console.log(item.vehicle_id,'-',item.latitude,'--',item.lngtitude,'--', item.or_code_id,'--',check_dbResponse_checkpoint.length);
                if(check_dbResponse_checkpoint.length == 0) {
                    var data = {
                        checkpoint_id: req.body.checkpoint_id,
                        checkpoint_location: item.checkpoint_location,
                        latitude: item.latitude,
                        lngtitude: item.lngtitude,
                        checkpoint_qr_code: item.checkpoint_qr_code,
                        or_code_id:item.or_code_id,
                        vehicle_id: req.body.vehicle_id,
                    }
                    var query = "INSERT INTO  ?? SET  ?";
                    var table = ["tbl_checkpoint_qr_code", data];
                    var dbResponse = await dbQuery.query(query, table);
                } else {
                    var data = {
                        checkpoint_location: item.checkpoint_location,
                        latitude: item.latitude,
                        lngtitude: item.lngtitude,
                        checkpoint_qr_code: item.checkpoint_qr_code
                    }
                    var query = "UPDATE ?? SET ? WHERE ??=?";
                    var table = ["tbl_checkpoint_qr_code",data, `or_code_id`, item.or_code_id];
                    var dbResponse = await dbQuery.query(query, table);
                }
                resolve();
            });    
        }).then((data)=> {
            console.log(data)
            res.send({status:true, message:"Checkpoint added successfully"})
        });
     

   } else {
     const myPromise = new Promise(async(resolve, reject) =>  {
 
        var checkpoint_data = {
            location_id: req.body.location_id,
            city_id: req.body.city_id,
            checkpoint_no: req.body.checkpoint_no,
            vehicle_id: req.body.vehicle_id,
        };
        var query_checkpoint = "INSERT INTO  ?? SET  ?";
        var table_checkpoint = ["tbl_checkpoint", checkpoint_data];
        var dbResponse_checkpoint = await dbQuery.query(query_checkpoint, table_checkpoint);
        console.log(dbResponse_checkpoint.insertId);

        var checkPoints = JSON.parse(req.body.checkPoints);
            checkPoints.forEach(async(item) => {
                var data = {
                    checkpoint_id: dbResponse_checkpoint.insertId,
                    checkpoint_location: item.checkpoint_location,
                    latitude: item.latitude,
                    lngtitude: item.lngtitude,
                    checkpoint_qr_code: item.checkpoint_qr_code,
                    or_code_id:item.or_code_id,
                    vehicle_id: req.body.vehicle_id,
                }
    
                var query = "INSERT INTO  ?? SET  ?";
                var table = ["tbl_checkpoint_qr_code", data];
                var dbResponse = await dbQuery.query(query, table);
            });
            resolve();
      }).then((data)=>{
          console.log(data)
          res.send({status:true, message:"Checkpoint added successfully"})
      });

   }
    
      
    
      
           
            // if(req.body.flag == "qr") {
            //     res.redirect('/add-qr-code');
            // } else {
            //     res.redirect('/checkpoints');
            // }
     
}



module.exports.editCheckpointGet = async  function (req, res, next) {
    if(!req.query.id) {
        res.redirect('/checkpoints');
        return false;
    }

    var query1 = `SELECT tbl_checkpoint.*, tbl_locations.location as location, tbl_cities.city as city FROM ?? LEFT JOIN tbl_cities ON tbl_cities.id = tbl_checkpoint.city_id LEFT JOIN tbl_locations on tbl_locations.id = tbl_checkpoint.location_id where  ??= ?`
    var table1 = [`tbl_checkpoint`, `tbl_checkpoint.id`, req.query.id];
    var dbrespCheckPoints = await dbQuery.query(query1, table1);

    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Checkpoints",
        cities:dbrespCity,
        checkPoints:dbrespCheckPoints
    }
    res.render("pages/checkpoints/edit", renderPageData);
}

module.exports.deleteCheckpointPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_checkpoint` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    var query1 = "DELETE FROM `tbl_checkpoint_qr_code` WHERE ?? = ?";
    var table1 = ['checkpoint_id', req.query.id];

    var dbResponse = await dbQuery.query(query1, table1);
    res.redirect('/checkpoints');
}

module.exports.editCheckpointPost = async function (req, res, next) {
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_checkpoint", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/checkpoints');
}

module.exports.trackCheckpoints = async function (req, res, next) {
    var query1 = `SELECT updated_on,checkpoint_location, latitude, lngtitude FROM ?? where  ??= ?`
    var table1 = [`tbl_checkpoint_qr_code`, `vehicle_id`, req.query.v_id];
    var dbrespCheckPoints = await dbQuery.query(query1, table1);

    var renderPageData = {
        url:req.url,
        title:"Track Checkpoints",
        checkPoints:dbrespCheckPoints,
        vehicle_id:req.query.v_id
    }
    res.render("pages/checkpoints/track-checkpoints",renderPageData);
}

module.exports.getlocationLatLng = async function (req, res, next) {
    var query1 = `SELECT checkpoint_location, latitude, lngtitude FROM ?? where  ??= ?`
    var table1 = [`tbl_checkpoint_qr_code`, `vehicle_id`, req.query.vehicle_id];
    var dbrespCheckPoints = await dbQuery.query(query1, table1);
    var lat_long = [];
    for(let i = 0;i < dbrespCheckPoints.length; i++) {
        lat_long.push([dbrespCheckPoints[i].checkpoint_location,dbrespCheckPoints[i].latitude,dbrespCheckPoints[i].lngtitude,i+1 ])
    }
    res.send({status:true, data:lat_long});
    
}


module.exports.deleteCheckPoint = async function (req, res, next) {
    console.log(req.query.id)
    var query = "DELETE FROM `tbl_checkpoint_qr_code` WHERE ?? = ?";
    var table = ['or_code_id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.send({status:true, message:"Checkpoint deleted successfully"})
}







