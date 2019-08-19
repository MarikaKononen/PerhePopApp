var bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    Place          = require("./models/paikat"),
    Comment        = require("./models/kommentit"),
    app            = express();
    seedDB         = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/kommentit"),
    placesRoutes  = require("./routes/paikat"),
    indexRoutes   = require("./routes/index");


// APP CONFIG
mongoose.connect("mongodb://localhost/perhepop_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/paikat", placesRoutes);
app.use("/paikat/:id/kommentit", commentRoutes);


app.listen(3000, function(){
    console.log("PerhePop App is started!");
});    