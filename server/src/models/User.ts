import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose, { Document } from "mongoose";

<<<<<<< HEAD
import { PersonnelDocument, HealthRecord } from "./Personnel";
=======
import { PersonnelDocument } from "./Personnel";
import { RecordDocument } from "./records/Record";
>>>>>>> b1c5a1d83bd8fc95a0b47b077463ede329f789d7

export interface UserDocument extends PersonnelDocument { 

    /* User */
<<<<<<< HEAD
    healthrecord: String[];
=======
    healthrecord: HealthRecord[];
>>>>>>> b1c5a1d83bd8fc95a0b47b077463ede329f789d7
    
}

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;


export interface AuthToken {
    accessToken: string;
    kind: string;
}

export interface HealthRecord {
    date: string;
    BloodPressure: string;
    BloodSugar: string;
}

/**
 * MongoDB Schema
 */

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    ID: {type: String, unique: true}, //UUID
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        birthday: String,
        location: String,
        website: String,
        picture: String
    },

    healthrecord: Array,

}, { timestamps: true });

/**
 * Password hash middleware.
 */

userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);   //callback function
    });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const User = mongoose.model<UserDocument>("User", userSchema);