var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/kayttaja");


// root route
router.get("/", function(req,res){
    res.render("landing");
});

//==========================
// AUTH ROUTES
//==========================

// show register form
router.get("/rekisteroidy", function(req, res){
    res.render("register");
});

// handle sign up logic
router.post("/rekisteroidy", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/paikat");
        });
    });
});

// show login form
router.get("/kirjaudu", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/kirjaudu", passport.authenticate("local", 
    {
        successRedirect: "/paikat",
        failureRedirect: "/kirjaudu"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Kirjauduit ulos!");
    res.redirect("/paikat");
});

module.exports = router;