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
import * as userController from "./controllers/user";
import * as searchController from "./controllers/search";

// Passport configuration
import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
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


/**
 * Primary app routes.
 */

app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.post("/signup", userController.postSignup);
app.post("/searchUser", searchController.postSearchUser);
app.post("/searchDoctor", searchController.postSearchDoctor);
app.get("/getAllUser", passportConfig.isAuthenticated, searchController.getAllUser);
app.get("/getAllDoctor", passportConfig.isAuthenticated, searchController.getAllDoctor);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
app.post("/account/add-record", passportConfig.isAuthenticated, userController.postAddRecord);
app.get("/account/get-recordlist", passportConfig.isAuthenticated, userController.getRecordList);
app.post("/account/get-record", passportConfig.isAuthenticated, userController.getRecord);
app.post("/authorize-user", passportConfig.isAuthenticated, userController.authorizeRecord);
app.post("/view-authorized-users", passportConfig.isAuthenticated, userController.viewAuthUser);
app.post("/view-user-records", passportConfig.isAuthenticated, userController.ViewuserRecord);
app.get("/view-authorizing-users", passportConfig.isAuthenticated, userController.ViewAuthedUser);
app.post("/remove-auth", passportConfig.isAuthenticated, userController.RemoveAuth);

export default app;
