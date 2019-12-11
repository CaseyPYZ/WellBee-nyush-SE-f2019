import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose, { Document } from "mongoose";
//import { string } from "prop-types";


export type Usertype = "user" | "doctor" | "admin";

export type UserInfo = { "name": string; "email": string; "usertype": Usertype};

export interface PersonnelDocument extends mongoose.Document { 
    name: string;
    email: string;
    usertype: Usertype;
    age: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        birthday: string;
        location: string;
        website: string;
        picture: string;
    };

    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;

}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);   //callback function
    });
};

export interface AuthToken {
    accessToken: string;
    kind: string;
}