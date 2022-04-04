var dbQuery = require("../db/dev/dbQuery");
var moment = require('moment');
module.exports.dashboardGet = async function (req, res, next) {
    if(req.query.c_id) {
        var query = `SELECT tbl_vehicle.vehicle_number, tbl_vehicle.id as vehicle_id, tbl_vehicle.driver_name,  GROUP_CONCAT(DISTINCT( tbl_checkpoint_qr_code.checkpoint_location),'~%') as checkpoint_location FROM ?? RIGHT JOIN tbl_checkpoint_qr_code ON tbl_checkpoint_qr_code.vehicle_id = tbl_vehicle.id LEFT JOIN tbl_checkpoint ON tbl_checkpoint.vehicle_id = tbl_vehicle.id WHERE tbl_checkpoint.city_id = `+req.query.c_id+` GROUP BY tbl_checkpoint_qr_code.vehicle_id`;
        var table = [`tbl_vehicle`];

    } else {
        var query = `SELECT tbl_vehicle.vehicle_number, tbl_vehicle.id as vehicle_id, tbl_vehicle.driver_name, GROUP_CONCAT(tbl_checkpoint_qr_code.checkpoint_location,'~%') as checkpoint_location FROM tbl_vehicle RIGHT JOIN tbl_checkpoint_qr_code ON tbl_checkpoint_qr_code.vehicle_id = tbl_vehicle.id GROUP BY tbl_checkpoint_qr_code.vehicle_id;`
        var table = [`tbl_vehicle`];

    }
    var dbrespV= await dbQuery.query(query, table);
    
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);

    var renderPageData = {
        url:req.url,
        title:"Dashboard",
        dbrespV:dbrespV,
        city:dbrespCity,
        city_id:req.query.c_id ? req.query.c_id : ""
    }
    
    res.render("pages/index",renderPageData);
}



