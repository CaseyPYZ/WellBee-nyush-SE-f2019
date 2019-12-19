import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { PersonnelDocument, comparePassword, UserInfo } from "./Personnel";

// @ts-ignore
export interface DoctorDocument extends PersonnelDocument {

    /* Doctor */
    position: string;
    holdsAuthList: UserInfo[];
};


const doctorSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    usertype: String,
    password: String,

    tokens: Array,

    profile: {
        name: String,
        age: String,
        gender: String,
        birthday: String,
        location: String,
        website: String,
    },

    holdsAuthList: Array
}, { timestamps: true });


/**
 * Password hash middleware.
 */

doctorSchema.pre("save", function save(next) {
    const user = this as DoctorDocument;
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

doctorSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
export const Doctor = mongoose.model<DoctorDocument>("Doctor", doctorSchema);