import { Request, Response, NextFunction } from "express";

import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";


/**/
//TO-DO: Merge postSearchUser and postSearchDoctor.
//       Add a wrapper to deal with different types of searching requirement.

export const postSearchUser = (req: Request, res: Response, next: NextFunction) => {
    const key = req.body.keyword;

    //This key word can be ID, name, email;

    User.findOne({email: key}, (err: Error, existingUser: UserDocument) => {
        if (err){ return next(err); }
        if (existingUser){ 
            return res.json({
                name: existingUser.name,
                email: existingUser.email,
                age: existingUser.age
            });
        }
        return res.send("User not found.");
    });
};

export const postSearchDoctor = (req: Request, res: Response, next: NextFunction) => {
    const key = req.body.keyword;

    //This key word can be ID, name, email;

    Doctor.findOne({email: key}, (err: Error, existingUser: UserDocument) => {
        if (err){ return next(err); }
        if (existingUser){ 
            return res.json({
                name: existingUser.name,
                email: existingUser.email,
                age: existingUser.age
            });
        }
        return res.send("User not found.");
    });
};

/**/
//TO-DO: Merge postSearchAllUser and postSearchAllDoctor.
//       Add a wrapper to deal with different types of searching requirement.

export const postSearchAllUser = (req: Request, res: Response, next: NextFunction) => {
    User.find({}, (err: Error, data: Array<UserDocument>) => {
        if (err){
            console.log(err);
            return next(err);
        }
        if (data.length == 0){
            console.log("No User exists");
            return res.status(404).send("No User found");
        }
        else{
            let userdata: { "name": string; "email": string; "age": string; }[] = [];
            data.forEach((userdoc: UserDocument, index) => {
                let userinfo = {"name": userdoc.name,
                                "email": userdoc.email,
                                "age": userdoc.age};
                userdata.push(userinfo);
            })
            return res.status(200).send(userdata)
        }
    });
}

export const postSearchAllDoctor = (req: Request, res: Response, next: NextFunction) => {
    Doctor.find({}, (err: Error, data: Array<UserDocument>) => {
        if (err){
            console.log(err);
            return next(err);
        }
        if (data.length == 0){
            console.log("No Doctor exists");
            return res.status(404).send("No Doctor found");
        }
        else{
            let userdata: { "name": string; "email": string; "age": string; }[] = [];
            data.forEach((userdoc: UserDocument, index) => {
                let userinfo = {"name": userdoc.name,
                                "email": userdoc.email,
                                "age": userdoc.age};
                userdata.push(userinfo);
            })
            return res.status(200).send(userdata)
        }
    });
}
