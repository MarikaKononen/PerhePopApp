var mongoose = require("mongoose");


// MONGOOSE-MODEL CONFIG
var placeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    category: String,
    country: String,
    city: String,
    address: String,
    age: [],
    price: String,
    published: {type:Date, default: Date.now}  ,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
});

module.exports = mongoose.model("Place", placeSchema);