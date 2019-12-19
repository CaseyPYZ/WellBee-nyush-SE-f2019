import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

import { PersonnelDocument, comparePassword, UserInfo } from "./Personnel";
import { RecordBrief } from "./records/Record";

export type EmergencyPROFILE = {
    name: string;
    age: string;
    BloodType: string;
    Allergies: string;
    DiseaseHistory: string;
}


export interface UserDocument extends PersonnelDocument { 
    /* User */
    recordBriefList: RecordBrief[];
    recordList: mongoose.Types.ObjectId[];

    /* User Authorization Lists */
    holdsAuthList: UserInfo[];
    grantedAuthList: UserInfo[];

    EmergencyProfile: EmergencyPROFILE;
}



/**
 * MongoDB Schema
 */

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    usertype: String,
    name: String,
    password: String,

    profile: {
        name: String,
        age: String,
        gender: String,
        birthday: String,
        location: String,
        website: String,
    },

    recordBriefList: Array,
    recordList: Array,
    holdsAuthList: Array,
    grantedAuthList: Array,

    EmergencyProfile: {
        name: String,
        age: String,
        BloodType: String,
        Allergies: String,
        DiseaseHistory: String
    }

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

userSchema.methods.comparePassword = comparePassword;


export const User = mongoose.model<UserDocument>("User", userSchema);