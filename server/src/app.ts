import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";
import * as searchController from "./controllers/search";

import * as signUp from "./controllers/signUp";


// API keys and Passport configuration
import * as passportConfig from "./config/passport";
import { nextTick } from "async";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

app.use(cors(corsOptions));
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user &&
        req.path !== "/login" &&
        req.path !== "/signup" &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        req.session.returnTo = req.path;
    } else if (req.user &&
        req.path == "/account") {
        req.session.returnTo = req.path;
    }
    next();
});
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

/**
 * Primary app routes.
 */
// app.options("*");
//app.get("/", homeController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/forgot", userController.getForgot);
app.post("/forgot", userController.postForgot);
app.get("/reset/:token", userController.getReset);
app.post("/reset/:token", userController.postReset);
app.get("/signup", userController.getSignup);
app.post("/signup", signUp.postSignup);
app.post("/searchUser", searchController.postSearchUser);
app.post("/searchDoctor", searchController.postSearchDoctor);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);
app.get("/getAllUser", passportConfig.isAuthenticated, searchController.getAllUser);
app.get("/getAllDoctor", passportConfig.isAuthenticated, searchController.getAllDoctor);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);
app.post("/account/add-record", passportConfig.isAuthenticated, userController.postAddRecord);
app.get("/account/get-recordlist", passportConfig.isAuthenticated, userController.getRecordList);
app.get("/account/get-record", passportConfig.isAuthenticated, userController.getRecord);
app.post("/authorize-user", passportConfig.isAuthenticated, userController.authorizeRecord);
app.get("/view-authorized-users", passportConfig.isAuthenticated, userController.viewAuthUser);
app.get("/view-user-record", passportConfig.isAuthenticated, userController.ViewuserRecord);

//app.use(cors(corsOptions));

/**
 * API examples routes.
 */
//app.get("/api", apiController.getApi);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//     res.redirect(req.session.returnTo || "/");
// });

export default app;
