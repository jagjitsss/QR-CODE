var dbQuery = require("../db/dev/dbQuery");

module.exports.photosGet = async function (req, res, next) {
    var query = `SELECT tbl_Photos.*, tbl_vehicle.driver_name,tbl_vehicle.vehicle_type,tbl_vehicle.vehicle_number FROM ?? LEFT JOIN tbl_vehicle ON tbl_vehicle.id = tbl_Photos.user_id;`
    var table = [`tbl_Photos`];
    var dbrespPhoto= await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"View Photos",
        photo: dbrespPhoto
    }
    
    res.render("pages/photos/list",renderPageData);
}


module.exports.deletephotosGet = async function (req, res, next) {
    var query = "DELETE FROM `tbl_Photos` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/view-photos');
}


