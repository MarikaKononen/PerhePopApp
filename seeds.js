var mongoose = require("mongoose");
var Place = require("./models/paikat");
var Comment = require("./models/kommentit");

var data = [
    {
        title: "Ahveniston moottorirata",
        image: "https://images.unsplash.com/photo-1530538604540-de0436821dc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description: "Ahveniston mottoriradalla viihtyy katsomassa niin kisoja kuin harjoituksia. Lorem, lorem, lorem....",
        category: "muu",
        country: "Suomi",
        city: "Hämeenlinna",
        address: "Moottoriradantie 3",
        age: ["kaikki"],
        price: "maksullinen"
    },
    {
        title: "Hauhon uimaranta",
        image: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description: "Ahveniston mottoriradalla viihtyy katsomassa niin kisoja kuin harjoituksia. Lorem, lorem, lorem....",
        category: "uimaranta",
        country: "Suomi",
        city: "Hauho",
        address: "Hauhontie 3",
        age: ["kaikki"],
        price: "ilmainen"
    },
    {
        title: "Porin leikkipuisto",
        image: "https://images.unsplash.com/photo-1528559767835-195df89f0b7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description: "Uusi ja iso leikkipuisto, jossa on myös kahvila.",
        category: "leikkipuisto",
        country: "Suomi",
        city: "Pori",
        address: "Porintie 3",
        age: ["alle kouluikäinen","kouluikäinen"],
        price: "ilmainen"
    },
    {
        title: "Linnan puisto",
        image: "https://images.unsplash.com/photo-1456072212651-c507cb43b26f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description: "Uusi ja iso leikkipuisto, jossa on myös kahvila.",
        category: "leikkipuisto",
        country: "Suomi",
        city: "Pori",
        address: "Porintie 3",
        age: ["alle kouluikäinen","kouluikäinen"],
        price: "ilmainen"
    },
    {
        title: "Porin leikkipuisto",
        image: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        description: "Uusi ja iso leikkipuisto, jossa on myös kahvila.",
        category: "leikkipuisto",
        country: "Suomi",
        city: "Pori",
        address: "Porintie 3",
        age: ["alle kouluikäinen","kouluikäinen"],
        price: "ilmainen"
    }
]

function seedDB(){
    // Remove all places
    Place.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed places");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments");
            // add few places
            data.forEach(function(seed){
                Place.create(seed, function(err, place){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a place");
                        // create a comment
                        Comment.create(
                            {
                                text: "Tämä paikka on upea, mutta vessa on kaukana.",
                                author: "Pasi"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    place.comments.push(comment);
                                    place.save(function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            console.log("created new comment");
                                        }
                                    });
                                }

                        });
                    }
                });
            });

        });
    });
}

module.exports = seedDB;