var dbQuery = require("../db/dev/dbQuery");
module.exports.reportGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Reports"
    }
    res.render("pages/reports/list", renderPageData);
}





