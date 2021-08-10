var express = require("express");
var router = express.Router();
var admin = require("../adminDb/admindb");
var fs = require("fs");


router.get("/", (req, res) => {
    admin.RetriveReportedToAdmin().then((respo) => {
        var user = respo;
        console.log(user);
        res.render("admin", { title: "Admin", user });
    });
});

router.get("/delete", (req, res) => {
    var reportid = req.query.id;
    var userid = req.query.Userid;

    admin.ReportDelete(reportid).then((respo) => {
        var id = respo;
        fs.unlink("public/codeimg/" + id + ".jpg", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlink("public/codevideo/" + id + ".mp4", (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        fs.unlink("public/profile/" + userid + ".jpg", (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                // admin.deleteuser(userid)
                            }
                        });
                    }
                });
            }
        });
        res.redirect("/");
    });
});

module.exports = router;
