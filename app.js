var express        = require("express"),
    app            = express(),
    passport       = require("passport"),
    flash          = require("connect-flash"),
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
var url = process.env.DATABASEURL || "mongodb://localhost/perhepop_app" 
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useCreateIndex: true
}).then(() =>{
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR:", err.message);
});

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seeding data to database


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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// routes configuration
app.use("/", indexRoutes);
app.use("/paikat", placesRoutes);
app.use("/paikat/:id/kommentit", commentRoutes);


var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("PerhePop App is started!");
});    