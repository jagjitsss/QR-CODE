var dbQuery = require("../db/dev/dbQuery");
var qrcode = require("qrcode");
module.exports.qrCodesGet = async function (req, res, next) {
    var query = `SELECT tbl_qr_code.*, tbl_checkpoint.checkpoint_no, tbl_checkpoint.checkpoint FROM ?? LEFT JOIN tbl_checkpoint ON tbl_checkpoint.id = tbl_qr_code.checkpoint_id ORDER BY tbl_qr_code.id DESC`
    var table = [`tbl_qr_code`];
    var dbResponse = await dbQuery.query(query, table);



    var renderPageData = {
        url:req.url,
        title:"Manage QR Code",
        codes:dbResponse
        
    }
    res.render("pages/qr/list", renderPageData);
}

module.exports.addQrCodesGet = async function (req, res, next) {
    var query = `SELECT * FROM ??`;
    var table = ["tbl_checkpoint"];
    var dbResponse = await dbQuery.query(query, table);
    

    var renderPageData = {
        url:req.url,
        title:"Manage QR Code",
        checkpoint:dbResponse
    }
    res.render("pages/qr/add", renderPageData);
}

module.exports.addQrCodesPost = async function (req, res, next) {
    qrcode.toDataURL(JSON.stringify(req.body), async(err, src) => {
        console.log(err)
        if (err){
            res.send("Something went wrong!!");
        }else {
            req.body.qr_code = src;
            var query = "INSERT INTO  ?? SET  ?";
            var table = ["tbl_qr_code", req.body];
            var dbResponse = await dbQuery.query(query, table);
            res.redirect('/qr-codes');
         

        } 
    }) 
    
}



module.exports.editQrCodesGet = async function (req, res, next) {
    var query1 = `SELECT * FROM ??`;
    var table1 = ["tbl_checkpoint"];
    var dbResponse1 = await dbQuery.query(query1, table1);
    var query = `SELECT * FROM tbl_qr_code where ?? = ?`;
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);

    var renderPageData = {
        url:req.url,
        title:"Manage QR Code",
        checkpoint:dbResponse1,
        QrCodes:dbResponse
    }
    res.render("pages/qr/edit", renderPageData);
}

module.exports.updateQrCodesPost = async function (req, res, next) {
    qrcode.toDataURL(JSON.stringify(req.body), async(err, src) => {
        if (err){
            res.send("Something went wrong!!");
        }else {
            req.body.qr_code = src;
            var query = "UPDATE ?? SET ? WHERE ??=?";
            var table = ["tbl_qr_code", req.body, `id`, req.body.id];
            var dbResponse = await dbQuery.query(query, table);
            res.redirect('/qr-codes');
        }
    })       
}

module.exports.deleteQrCodesPost = async function (req, res, next) {
    var query = "DELETE FROM `tbl_qr_code` WHERE ?? = ?";
    var table = ['id', req.query.id];
    var dbResponse = await dbQuery.query(query, table);
    res.redirect('/qr-codes');
}








