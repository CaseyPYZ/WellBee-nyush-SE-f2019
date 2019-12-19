import bcrypt from "bcrypt-nodejs";
import mongoose, { Document } from "mongoose";
//import { string } from "prop-types";


export type Usertype = "user" | "doctor" | "admin";

export type UserInfo = { "name": string; "email": string; "usertype": Usertype };

export interface PersonnelDocument extends mongoose.Document { 
    name: string;
    email: string;
    usertype: Usertype;
    password: string;


    profile: {
        name: string;
        age: string;
        gender: string;
        birthday: string;
        location: string;
        website: string;
    };

    comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);   //callback function
    });
};
