var express        = require("express"),
    app            = express(),
    passport       = require("passport"),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/kayttaja"),
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
// seedDB(); // seeding data to database

app.use(methodOverride("_method"));


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Pala is a perfect dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// routes configuration
app.use("/", indexRoutes);
app.use("/paikat", placesRoutes);
app.use("/paikat/:id/kommentit", commentRoutes);



app.listen(3000, function(){
    console.log("PerhePop App is started!");
});    