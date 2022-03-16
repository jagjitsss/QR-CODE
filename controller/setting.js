var dbQuery = require("../db/dev/dbQuery");
module.exports.settingGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Setting"
    }
    res.render("pages/setting", renderPageData);
}

module.exports.changePassword = async function (req, res, next) {
   console.log(req.body)
    var query = "UPDATE ?? SET ? WHERE ??=?";
    var table = ["tbl_admin", req.body, `id`, req.session.isData[0].id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/setting');
}



