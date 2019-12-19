import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { PersonnelDocument, comparePassword } from "./Personnel";

// @ts-ignore
export interface AdminDocument extends PersonnelDocument {

    /* Admin */
    position: string;
    
};

const adminSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });


/**
 * Password hash middleware.
 */

adminSchema.pre("save", function save(next) {
    const user = this as AdminDocument;
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


adminSchema.methods.comparePassword = comparePassword;


/**
 * Helper method for getting user's gravatar.
 */


export const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);