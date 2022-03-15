module.exports.qrCodesGet = function (req, res, next) {
    res.render("pages/qr/list");
}

module.exports.addQrCodesGet = function (req, res, next) {
    res.render("pages/qr/add");
}

module.exports.editQrCodesGet = function (req, res, next) {
    res.render("pages/qr/edit");
}







