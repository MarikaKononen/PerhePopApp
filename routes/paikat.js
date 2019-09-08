var express = require("express");
var router  = express.Router(); 
var  Place  = require("../models/paikat");
var middleware = require("../middleware");

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
router.get("/uusi", middleware.isLoggedIn, function(req, res){
    res.render("paikat/uusi");
});


// CREATE ROUTE 
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form 
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.description;
    var category = req.body.category;
    var country = req.body.country;
    var city = req.body.city;
    var address = req.body.address;
    var age = req.body.age;
    var price = req.body.price;
    var author = {
                id: req.user._id,
                username: req.user.username
        }
    console.log("create route:  ", req.body);    
    var newPlace = {title: title, image: image, description:description, 
                    category:category, country: country, city:city, 
                    address:address, age:age, price:price, author:author };

    // Create a new place and save to DB                
    Place.create(newPlace, function(err, newPlace){
        if(err){
            res.render("paikat/uusi");
            console.log("Uuden paikan luoti ei onnistunut: ", err);
            req.flash("error", "Valitettavasti jokin meni pieleen ja uusi paikka ei tallentunut." )
        } else {
            req.flash("succes", "Uusi paikka tallennettu.")
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
router.get("/:id/muokkaa", middleware.checkPlaceOwnership, function(req, res){
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
router.put("/:id", middleware.checkPlaceOwnership, function(req, res){
    Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatePlace){
        if(err){
            res.redirect("/paikat");
            req.flash("error", err.message)
        } else {
            req.flash("success", "Tiedot päivitetty.")
            res.redirect("/paikat/" + req.params.id);
        }
    });
});

// DESTROY ROUTE 
router.delete("/:id", middleware.checkPlaceOwnership, function(req, res){
    //destroy blog
    Place.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/paikat");
            req.flash("error", err.message)
        } else {
            req.flash("success", "Paikka poistettu.")
            res.redirect("/paikat");
        }
    });
});

module.exports = router;