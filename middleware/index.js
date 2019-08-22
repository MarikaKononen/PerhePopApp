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
    res.redirect("/kirjaudu");
}

module.exports = middlewareObj;