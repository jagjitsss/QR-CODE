var dbQuery = require("../db/dev/dbQuery");

module.exports.loginGet = function (req, res, next) {
    var renderPageData = {
        status:req.query.status ? req.query.status : '',
       
    }
    res.render("pages/login",renderPageData);
}
module.exports.userLoginPost = async function (req, res, next) {
    console.log(req.body);
    var sql = `SELECT * FROM tbl_admin WHERE ??=? `;
    var table = [`email`, req.body.email]
    var dbrespCity = await dbQuery.query(sql, table);
    if(dbrespCity.length == 0) {
        res.redirect('/login?status=1');
        return false;
    } else {

        if(dbrespCity[0].password != req.body.password) {
            res.redirect('/login?status=2');
            return false;
        } else {
            req.session.isLogin = true;
            req.session.isData = dbrespCity;
            res.redirect('/');
            return false;
        }

    }
}

module.exports.forgotPasswordGet = function (req, res, next) {
    res.render("pages/forgot-password");
}

module.exports.userLogout = function (req, res, next) {
    req.session.destroy(function(err) {
        res.redirect('/');
    })
}


