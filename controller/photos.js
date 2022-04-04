var dbQuery = require("../db/dev/dbQuery");

module.exports.photosGet = async function (req, res, next) {
    var query = `SELECT tbl_photos.*, tbl_vehicle.driver_name,tbl_vehicle.vehicle_type,tbl_vehicle.vehicle_number FROM ?? LEFT JOIN tbl_vehicle ON tbl_vehicle.id = tbl_photos.user_id;`
    var table = [`tbl_photos`];
    var dbrespPhoto= await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"View Photos",
        photo: dbrespPhoto
    }
    
    res.render("pages/photos/list",renderPageData);
}


module.exports.deletephotosGet = async function (req, res, next) {
    var query = "DELETE FROM `tbl_photos` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/view-photos');
}


