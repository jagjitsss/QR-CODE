var dbQuery = require("../db/dev/dbQuery");
module.exports.usersGet = async function (req, res, next) {
    var query = `SELECT * FROM ?? ORDER BY id DESC`
    var table = [`tbl_user`];
    var dbrespUsers = await dbQuery.query(query, table);
    
    var renderPageData = {
        url:req.url,
        title:"Manage Users",
        users:dbrespUsers
    }
    res.render("pages/user/list", renderPageData);
}

module.exports.addUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Users"
    }
    res.render("pages/user/add",renderPageData);
}

module.exports.addUserPost = async function (req, res, next) {
     console.log(req.body.isActive);
    if(req.body.isActive) {
        req.body.isActive = 1;
    }
     var query = "INSERT INTO  ?? SET  ?";
     var table = ["tbl_user", req.body];
     var dbResponse = await dbQuery.query(query, table);
     res.redirect('/users');
}

module.exports.editUserGet = async function (req, res, next) {
    if(!req.query.id) {
        res.redirect('/cities');
        return false;
    }
    var query = `SELECT * FROM tbl_user where ?? = ?`;
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    var renderPageData = {
        url:req.url,
        title:"Manage Users",
        user:dbResponse
    }
    res.render("pages/user/edit",renderPageData);
}



module.exports.editUserPost = async function (req, res, next) {
    
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_user", req.body, `id`, req.body.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/users');
}

module.exports.updateIsActive = async function (req, res, next) {
    
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_user", req.query, `id`, req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.send({status:true,data:dbResponse, message:"Updated"})
}


module.exports.deleteUserPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_user` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/users');
}


module.exports.viewUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Users"
    }
    res.render("pages/user/view",renderPageData);
}

module.exports.trackUserGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Manage Users"
    }
    res.render("pages/user/track",renderPageData);
}



