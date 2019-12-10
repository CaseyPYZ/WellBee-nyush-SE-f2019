import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { PersonnelDocument, comparePassword } from "./Personnel";

// @ts-ignore
export interface AdminDocument extends PersonnelDocument {

    /* Admin */
    position: string;
    
};

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    usertype: String,
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    tokens: Array,

    profile: {
        name: String,
        gender: String,
        birthday: String,
        location: String,
        website: String,
        picture: String
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

adminSchema.methods.gravatar = function (size: number = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);