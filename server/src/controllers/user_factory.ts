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
                usertype: req.body.usertype,
            });

            User.findOne({ email: req.body.email }, (err, existingUser: UserDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists." );
                    return res.status(400).send({ msg: "User with that email address already exists." });
                }
                console.log("====saving user information =====");
                console.log(user);
                user.save((err) => {
                    if (err) { 
                        console.log(err);
                        return res.status(400).send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send(err);
                        }
                        console.log(user);
                        console.log(req.user);
                        return res.status(200).json({ user: req.user, msg: "Success signing up user" });
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
                usertype: req.body.usertype,
            });

            Doctor.findOne({ email: req.body.email }, (err, existingUser: DoctorDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists.");
                    return res.status(400).json({ msg: "Doctor with that email address already exists." });
                }
                
                user.save(err => {
                    if (err) { return res.status(400).send(err); }
                    console.log("[[[]]] Save user succeed.");
                    req.logIn(user, (err) => {
                        if (res.headersSent) return res;
                        console.log("[[[]]] Login user.");
                        if (err) {
                            console.log(err);
                            return res.send(err);
                        }
                        console.log("[[[]]] Login user success.");
                        console.log(user);
                        return res.status(200).json({ user: req.user, msg: "Success signing up doctor" });
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
                usertype: req.body.usertype,
            });

            Admin.findOne({ email: req.body.email }, (err, existingUser: AdminDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists.");
                    return res.status(400).json({ msg: "Admin with that email address already exists." });
                }
                user.save((err) => {
                    if (err) { return res.status(400).send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send(err);
                        }
                        console.log(req.user);
                        return res.status(200).json({ user: req.user, msg: "Success signing up admin" });
                    });
                });
            });

            break;
        }
        default:{
            return res.status(400).json({msg: "Usertype not supported"});
        }
    }
};
