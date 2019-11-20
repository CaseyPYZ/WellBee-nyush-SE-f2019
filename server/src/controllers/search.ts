import { Request, Response, NextFunction } from "express";

import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";


export const postSearch = (req:Request, res: Response, next: NextFunction) => {
    const key = req.body.keyword;

    //This key word can be ID, name, email;

    User.findOne({email: req.body.keyword}, (err: Error, existingUser: UserDocument) => {
        if (err){ return next(err); }
        if (existingUser){ 
            res.json({
                name: existingUser.name,
                email: existingUser.email,
                age: existingUser.age
            })
        }
        res.send("User not found.");
    })
}