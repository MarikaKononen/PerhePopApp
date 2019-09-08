var Place = require("../models/paikat");
var Comment = require("../models/kommentit");

// all middleware goes here
var middlewareObj = {};



middlewareObj.checkPlaceOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Place.findById(req.params.id, function(err, foundPlace){
            if(err){
                res.redirect("/paikat");
            } else {
                // Added this block, to check if foundPlace exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if(!foundPlace){
                    req.flash("error", "Paikkaa ei löytynyt.");
                    return res.redirect("back");
                }
                //does user own the place?
                // place.author.id => mongoose object
                // req.user._id => string, comparing those needs equals
                if(foundPlace.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be loggen in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("/paikat");
            } else {
                // Added this block, to check if foundComment exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if(!foundComment){
                    req.flash("error", "Kommenttia ei löytynyt.");
                    return res.redirect("back");
                }
                //does user own the comment?
                // comment.author.id => mongoose object
                // req.user._id => string, comparing those needs equals
                console.log("foundComment", foundComment)
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be loggen in to do that");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Sinun täytyy kirjautua.");
    res.redirect("/kirjaudu");
}

module.exports = middlewareObj;