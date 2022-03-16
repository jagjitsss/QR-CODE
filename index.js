const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const exp = require("constants");
const session = require('express-session')

const app = express();
const port = process.env.port || 3000;
const authRoute = require('./routers/auth_router.js');
const userRoute = require('./routers/user_router.js');
const qrRoute = require('./routers/qr_router.js');
const indexRoute = require('./routers/index_router.js');
const settingRoute = require('./routers/setting_router.js');
const locationRoute = require('./routers/location_router.js');


app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.set('trust proxy', 1) // trust first proxy
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(express.static("public"));
app.use('/', [indexRoute,authRoute,userRoute,qrRoute,settingRoute,locationRoute]);


var server_port = process.env.PORT || process.env.PORT || 80;
app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});
