import passport from "passport";
import passportLocal from "passport-local";
import _ from "lodash";

import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";
import { Request, Response, NextFunction } from "express";
import { DocumentProvider } from "mongoose";

const LocalStrategy = passportLocal.Strategy;

interface UserInfoTuple{
    type: string;
    id: any;
}

export type UserInfo= {
    id: string;
    usertype: string;
};

passport.serializeUser<any, any>((user, done) => {
    // console.log("=====serializeUser=====");
    // console.log(user);
    // console.log(user.usertype);
    // console.log("=======================");
    const userinfo: UserInfo = {
        id: user.id,
        usertype: user.usertype,
    };
    done(undefined, userinfo);
});

passport.deserializeUser((user: UserInfo, done) => {
    // console.log("=====deserializeUser=====");
    // console.log(user);
    // console.log(user.usertype);
    // console.log("=========================");
    switch (user.usertype){
        case "user": {
            User.findById(user.id, (err, user: UserDocument) => {
                done(err, user);
            });
            break;
        }
        case "doctor": {
            Doctor.findById(user.id, (err, doctor: DoctorDocument) =>{
                done(err, doctor);
            });
            break;
        }
        case "admin": {
            Admin.findById(user.id, (err, admin: AdminDocument) =>{
                done(err, admin);
            });
            break;
        }
    }
});



/**
 * Log in for muiltiple user types
 */
passport.use("userLocal", new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));

passport.use("doctorLocal", new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Doctor.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));


passport.use("adminLocal", new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Admin.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));


/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({isAuthenticated: false, redirect: true});
};

