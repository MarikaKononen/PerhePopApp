var express = require("express");
var router  = express.Router(); 
var  Place  = require("../models/paikat");

// INDEX ROUTE
router.get("/", function(req,res){
    Place.find({}, function(err, places){
        if(err){
            console.log("Error!");
        } else {
            res.render("index", {places: places});
        }
    });
});

// NEW ROUTE
router.get("/uusi", isLoggedIn, function(req, res){
    res.render("paikat/uusi");
});

// CREATE ROUTE 
router.post("/",isLoggedIn, function(req,res){
    Place.create(req.body.place, function(err, newPlace){
        if(err){
            res.render("paikat/uusi");
            console.log("Uuden paikan luoti ei onnistunut: ", err);
        } else {
            res.redirect("/paikat");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
    Place.findById(req.params.id).populate("comments").exec(function(err, foundPlace){
        if(err){
            console.log("Error from DB:::", err);
            res.redirect("/blogs");
        } else {
            res.render("paikat/show", {place: foundPlace});
        }
    });
});

// EDIT ROUTE
router.get("/:id/muokkaa", isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, foundPlace){
        if(err){
            res.redirect("/paikat");
            console.log(err);
        } else {
            res.render("paikat/muokkaa", {place: foundPlace});
        }
    });
});

// UPDATE ROUTE
router.put("/:id", isLoggedIn, function(req, res){
    Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatePlace){
        if(err){
            res.redirect("/paikat");
        } else {
            res.redirect("/paikat/" + req.params.id);
        }
    });
});

// DELETE ROUTE 
router.delete("/:id", isLoggedIn, function(req, res){
    //destroy blog
    Place.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/paikat");
        } else {
            res.redirect("/paikat");
        }
    });
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/kirjaudu");
}

module.exports = router;