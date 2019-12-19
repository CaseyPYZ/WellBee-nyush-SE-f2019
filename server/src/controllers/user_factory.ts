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
                name: req.body.name,
                password: req.body.password,
                usertype: req.body.usertype,
                profile: {
                    name: req.body.profile.name || "",
                    age: req.body.profile.age || "",
                    gender: req.body.profile.gender || "",
                    birthday: req.body.profile.birthday || "",
                    location: req.body.profile.location ||"",
                    website: req.body.profile.website || "",
                }
            });

            User.findOne({ email: req.body.email }, (err, existingUser: UserDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists." );
                    return res.status(400).send({UserAlreadyExist: true});
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
                name: req.body.name,
                password: req.body.password,
                usertype: req.body.usertype,
                profile: {
                    name: req.body.name || "",
                    age: req.body.age || "",
                    gender: req.body.gender || "",
                    birthday: req.body.birthday || "",
                    location: req.body.location ||"",
                    website: req.body.website || "",
                }
            });

            Doctor.findOne({ email: req.body.email }, (err, existingUser: DoctorDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists.");
                    return res.status(400).json({UserAlreadyExist: true});
                }
                
                user.save(err => {
                    if (err) { return res.status(400).send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err);
                            return res.send(err);
                        }
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
                name: req.body.name,
                password: req.body.password,
                usertype: req.body.usertype,
                profile: {
                    name: req.body.name || "",
                    age: req.body.age || "",
                    gender: req.body.gender || "",
                    birthday: req.body.birthday || "",
                    location: req.body.location || "",
                    website: req.body.website || "",
                }
            });

            Admin.findOne({ email: req.body.email }, (err, existingUser: AdminDocument) => {
                if (err) { return res.status(400).send(err); }
                if (existingUser) {
                    console.log("Account with that email address already exists.");
                    return res.status(400).json({UserAlreadyExist: true});
                }
                user.save((err) => {
                    if (err) { return res.status(400).send(err); }
                    req.logIn(user, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send(err);
                        }
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
