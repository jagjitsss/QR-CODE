const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const exp = require("constants");

const app = express();
const port = process.env.port || 3000;
const authRoute = require('./routers/auth_router.js');
const userRoute = require('./routers/user_router.js');
const qrRoute = require('./routers/qr_router.js');
const indexRoute = require('./routers/index_router.js');
const settingRoute = require('./routers/setting_router.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));
app.use('/', [indexRoute,authRoute,userRoute,qrRoute,settingRoute]);
app.get("/qr", (req, res, next) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");
    console.log(src)
    res.render("scan", {
      qr_code: src,
    });
  });
});
var server_port = process.env.PORT || process.env.PORT || 80;
app.listen(server_port, function() {
    console.log('Listening on port %d', server_port);
});
