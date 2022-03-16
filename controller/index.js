module.exports.dashboardGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"Dashboard"
    }
    
    res.render("pages/index",renderPageData);
}



