var express = require("express");
var router  = express.Router({mergeParams: true});
var Place = require("../models/paikat");
var Comment    = require("../models/kommentit");
var middleware = require("../middleware");



//=========================
// COMMENTS ROUTES
//=========================

// Comments new
router.get("/uusi", middleware.isLoggedIn, function(req, res){
    Place.findById(req.params.id, function(err, place){
        if(err){
            console.log(err);
        } else {
            res.render("kommentit/uusi", {place: place})
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
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
                            req.flash("error", "Pahoittelut, jokin meni vikaan ja kommenttia ei tallennettu.")
                            res.redirect("/paikat");
                        } else {
                            console.log("new comment saved");
                            req.flash("success", "Kommentti tallennettu.");
                            res.redirect("/paikat/" + place._id);
                        }
                    });
                }
            });
        }
    });
});

//  COMMENT EDIT ROUTE
router.get("/:comment_id/muokkaa", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("kommentit/muokkaa", {place_id: req.params.id, comment: foundComment });
        }
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/paikat/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Kommentti poistettu. ");
            res.redirect("/paikat/" + req.params.id)
        }
    });
});


module.exports = router;