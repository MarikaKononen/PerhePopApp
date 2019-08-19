var express = require("express");
var router  = express.Router({mergeParams: true});
var Place = require("../models/paikat");
var Comment    = require("../models/kommentit");



//=========================
// COMMENTS ROUTES
//=========================
router.get("/paikat/:id/kommentit/uusi", function(req, res){
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
        } else {
            res.render("kommentit/uusi", {place: place})
        }
    });
});

router.post("/paikat/:id/kommentit", function(req, res){
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
            res.redirect("/paikat");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    place.comments.push(comment);
                    place.save(function(err, comment){
                        if(err){
                            console.log("Didn't saved the comment", err);
                            res.redirect("/paikat");
                        } else {
                            console.log("new comment saved");
                            res.redirect("/paikat/" + place._id);
                        }
                    });
                }
            });
        }
    });

});


module.exports = router;