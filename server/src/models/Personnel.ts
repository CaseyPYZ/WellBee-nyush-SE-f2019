import mongoose, { Document } from "mongoose";

export interface PersonnelDocument extends mongoose.Document { 
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        birthday: string; // added birthday attribute for age
        location: string;
        website: string;
        picture: string;
    };

    comparePassword: comparePasswordFunction;
    gravatar: (size: number) => string;

}


type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}