var dbQuery = require("../db/dev/dbQuery");

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
    var query = "INSERT INTO  ?? SET  ?";
    var table = ["tbl_locations", req.body];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/locations');
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
    res.send({status:true,data:dbResponse})
}



module.exports.checkpointsGet = async function (req, res, next) {
    var query = `SELECT tbl_checkpoint.*, tbl_locations.location as location, tbl_cities.city as city FROM ?? LEFT JOIN tbl_cities ON tbl_cities.id = tbl_checkpoint.city_id LEFT JOIN tbl_locations on tbl_locations.id = tbl_checkpoint.location_id ORDER BY id DESC`
    var table = [`tbl_checkpoint`];
    var dbrespCheckPoints = await dbQuery.query(query, table);

    
    var renderPageData = {
        url:req.url,
        title:"Manage Checkpoints",
        checkPoints:dbrespCheckPoints
    }
    res.render("pages/checkpoints/list", renderPageData);
}



module.exports.addCheckpointGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_cities`];
    var dbrespCity = await dbQuery.query(query, table);

    var renderPageData = {
        url:req.url,
        title:"Manage Checkpoints",
        cities:dbrespCity
    }
    res.render("pages/checkpoints/add", renderPageData);
}

module.exports.addCheckpointPost = async function (req, res, next) {
    var query = "INSERT INTO  ?? SET  ?";
    var table = ["tbl_checkpoint", req.body];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/checkpoints');
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
    console.log(dbrespCheckPoints)
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
    res.redirect('/checkpoints');
}

module.exports.editCheckpointPost = async function (req, res, next) {
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_checkpoint", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/checkpoints');
}






