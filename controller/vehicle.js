var dbQuery = require("../db/dev/dbQuery");
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


module.exports.deleteUserPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_vehicle` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/vehicle');
}


module.exports.viewUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle"
    }
    res.render("pages/vehicle/view",renderPageData);
}

module.exports.trackUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Vehicle"
    }
    res.render("pages/vehicle/track",renderPageData);
}



