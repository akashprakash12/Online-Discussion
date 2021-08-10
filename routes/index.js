const { response, query } = require("express");
var express = require("express");
var router = express.Router();
var details = require("../db-usrerdetails/sign-updetails");
var QuistionInsertion = require("../db-usrerdetails/Question-Upload");
var AnswerInsertion = require("../db-usrerdetails/Answer-Upload");
var multer = require("multer");
var Joi = require("joi");
var url = require("url");
var querystr = require("querystring");
var retrive = require("../db-usrerdetails/RetriveQ$A");
const { object } = require("joi");
const admin = require("../adminDb/admindb");
var fs = require("fs");
var path = require("path");
// validataion

var schema = Joi.object().keys({
    Username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: Joi.string()
        .regex(/^[0-9]{10}$/)
        .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
        .required(),

    password: Joi.string()
        .min(8)
        .max(50)
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
    RePassword: Joi.ref("password"),
});
var loginschema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
        .min(8)
        .max(50)
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
});

/* GET home page. */
router.get("/", function (req, res) {
    var language = ["javascript", "java"];
    var user = req.session.userdata;
    res.render("index", { title: "Express", language, user });
});
router.get("/", function (req, res) {
    if (!req.session.userdata) {
        res.redirect("/sign-up");
    } else {
        res.redirect("/");
    }
});
router.get("/sign-up", function (req, res) {
    if (req.session.userdata) {
        res.redirect("/");
    } else {
        var userExist = req.query.userEx;
        var errMessage = req.query.message;
        res.render("sign-up", { title: "Sign-Up", errMessage, userExist });
    }
});

router.get("/login", (req, res) => {
    if (req.session.userdata) {
        res.redirect("/");
    } else {
        var welcome = req.query.welcome;
        var vlid = req.session.vlaidationErr;
        var er = vlid;
        res.render("login", { title: "Login", welcome, loggederr: req.session.loggederr, er });
        req.session.loggederr = false;
        req.session.vlaidationErr = null;
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.redirect("/login");
});

router.get("/team", (req, res) => {
    res.render("team", { title: "team" });
});
router.get("/about", (req, res) => {
    res.render("about", { title: "about" });
});

router.get("/discous", (req, res) => {
    if (!req.session.userdata) {
        res.redirect("/");
    } else {
        retrive.RetriveQuestion().then((response) => {
            retrive.RetriveAnswer().then((answer) => {
                res.render("discous", { title: "Discous", response, answer });
            });
        });
    }
});

router.get("/Question", (req, res) => {
    if (!req.session.userdata) {
        redirect("/");
    } else {
        res.render("Question", { title: "Post-Question" });
    }
});
router.get("/answer", (req, res) => {
    if (!req.session.userdata) {
        redirect("/");
    } else {
        res.render("answer", { title: "Post-Answer" });
    }
});

router.get("/User_P", (req, res) => {
    var user = req.session.userdata;
    if (!req.session.userdata) {
        res.redirect("/");
    } else {
        res.render("profile", { title: "Profile", user });
    }
});
// ===========================sign up page set up===============================

router.post("/sign-up", (req, res) => {
    var { error } = schema.validate(req.body);
    if (error) {
        var er = error.details[0].message;
        var quer = querystr.stringify({
            message: er,
        });
        res.redirect("/sign-up?" + quer);
    } else {
        details
            .DoSignup(req.body)
            .then((respo) => {
                let image = req.files.Image;
                image.mv("./public/profile/" + respo._id + ".jpg");

                var string = "welcome  " + respo.Username + " you successfully signed-up ";
                var sucess = querystr.stringify({
                    welcome: string,
                });
                res.redirect("/login?" + sucess);
            })
            .catch((UserExist) => {
                console.log(UserExist);
                var userExist = querystr.stringify({
                    userEx: UserExist,
                });
                res.redirect("/sign-up?" + userExist);
            });
    }
});

// ================================login page set up=================================
router.post("/login", (req, res) => {
    var { error } = loginschema.validate(req.body);
    if (error) {
        var er = error.details[0].message;
        req.session.vlaidationErr = er;
        res.redirect("/login");
    } else {
        details.Dologin(req.body).then((response) => {
            if (response.status) {
                req.session.logged = true;
                req.session.userdata = response.user;
                if (
                    response.user.email == "admin@gmail.com" &&
                    response.user.password == response.user.password
                ) {
                    res.redirect("/admin");
                } else {
                    res.redirect("/");
                }
            } else {
                req.session.loggederr = true;
                res.redirect("/login");
            }
        });
    }
});

router.post("/discous", (req, res) => {
    var id = req.query.id;
    const obj = Object.assign({}, req.body);
    AnswerInsertion.inserLikeDislikeReport(id, obj);
    res.redirect("/discous");
});

router.post("/Question", (req, res) => {
    if (!req.session.userdata) {
        res.redirect("/");
    } else {
        let data = req.body;
        var user = req.session.userdata;
        data = {
            userdata: user,
            code: data,
        };
        QuistionInsertion.insertData(data)
            .then((response) => {
                console.log(response);
                var data = (req.session.data = response);
                let image = req.files.Image;
                let video = req.files.videoupload;
                image.mv("./public/codeimg/" + response._id + ".jpg");
                video.mv("./public/codevideo/" + response._id + ".mp4");
                // console.log(data._id);
                res.redirect("/discous");
            })
            .catch((error) => {
                res.redirect("/Question");
            });
    }
});

router.post("/answer", (req, res) => {
    if (!req.session.userdata) {
        res.redirect("/");
    } else {
        let data = req.body;
        var user = req.session.userdata;
        data = {
            Answercode: data,
            UserAnswer: user,
            answerId: user._id,
            name: user.Username,
            like: 0,
            dislike: 0,
            report: 0,
        };
        AnswerInsertion.insertData(data)
            .then((response) => {
                req.session.answerid = response._id;
                let image = req.files.Image;
                let video = req.files.videoupload;
                image.mv("./public/codeimg/" + response._id + ".jpg");
                video.mv("./public/codevideo/" + response._id + ".mp4");
                res.redirect("/discous");
            })
            .catch((error) => {
                res.redirect("/answer");
            });
    }
});

module.exports = router;
