module.exports.usersGet = function (req, res, next) {
    res.render("pages/user/list");
}

module.exports.addUserGet = function (req, res, next) {
    res.render("pages/user/add");
}

module.exports.editUserGet = function (req, res, next) {
    res.render("pages/user/edit");
}

module.exports.viewUserGet = function (req, res, next) {
    res.render("pages/user/view");
}

module.exports.trackUserGet = function (req, res, next) {
    res.render("pages/user/track");
}



