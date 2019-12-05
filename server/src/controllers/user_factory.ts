import { Request, Response, NextFunction } from "express";

import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";
import { userInfo } from "os";


export const createUser = (req: Request, res: Response, next: NextFunction) => {

    console.log("SIGNUP");
    console.log(req.body);
    
    switch(req.body.usertype){
        case "user": {
            console.log("SIGNUP USER");
            const user = new User({
                email: req.body.email,
                password: req.body.password,
            });

            User.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return res.send(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.status(400).send({ msg: "User with that email address already exists." });
                }
                user.save((err) => {
                    if (err) { return res.send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.send(err);
                        }
                        return res.send({ user: req.user, msg: "Success signing up user" });
                    });
                });
            });

            break;
        }
        case "doctor": {
            console.log("SIGNUP DOCTOR");
            const user = new Doctor({
                email: req.body.email,
                password: req.body.password,
            });

            Doctor.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return res.send(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.send({ msg: "Doctor with that email address already exists." });
                }
                user.save((err) => {
                    if (err) { return res.send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.send(err);
                        }
                        return res.send({ user: req.user, msg: "Success signing up doctor" });
                    });
                });
            });

            break;
        }
        case "admin": {
            console.log("SIGNUP ADMIN");
            const user = new Admin({
                email: req.body.email,
                password: req.body.password,
            });

            Admin.findOne({ email: req.body.email }, (err, existingUser) => {
                if (err) { return res.send(err); }
                if (existingUser) {
                    req.flash("errors", { msg: "Account with that email address already exists." });
                    return res.send({ msg: "Admin with that email address already exists." });
                }
                user.save((err) => {
                    if (err) { return res.send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            return res.send(err);
                        }
                        return res.send({ user: req.user, msg: "Success signing up admin" });
                    });
                });
            });

            break;
        }
    }
};
