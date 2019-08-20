var express = require("express");
var router  = express.Router({mergeParams: true});
var Place = require("../models/paikat");
var Comment    = require("../models/kommentit");



//=========================
// COMMENTS ROUTES
//=========================

// Comments new
router.get("/uusi",isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
        } else {
            res.render("kommentit/uusi", {place: place})
        }
    });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
            res.redirect("/paikat");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
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

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/kirjaudu");
}


module.exports = router;