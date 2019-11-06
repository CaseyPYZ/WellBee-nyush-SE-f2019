import { Request, Response, NextFunction } from "express";

import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";
import { userInfo } from "os";


export const createUser = (req: Request, res: Response, next: NextFunction) => {

    switch(req.body.usertype){
        case "user": {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
            });

            User.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return next(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.redirect("/signup");
                }
                user.save((err) => {
                    if (err) { return next(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect("/");
                    });
                });
            });

            break;
        }
        case "doctor": {
            const user = new Doctor({
                email: req.body.email,
                password: req.body.password,
            });

            Doctor.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return next(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.redirect("/signup");
                }
                user.save((err) => {
                    if (err) { return next(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect("/");
                    });
                });
            });

            break;
        }
        case "admin": {
            const user = new Admin({
                email: req.body.email,
                password: req.body.password,
            });

            Admin.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return next(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.redirect("/signup");
                }
                user.save((err) => {
                    if (err) { return next(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        res.redirect("/");
                    });
                });
            });

            break;
        }

    }
        
    

}
