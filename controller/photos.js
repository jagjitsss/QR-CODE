module.exports.photosGet = function (req, res, next) {
    var renderPageData = {
        url:req.url,
        title:"View Photos"
    }
    
    res.render("pages/photos/list",renderPageData);
}



