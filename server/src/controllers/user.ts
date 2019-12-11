import async, { nextTick } from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { AuthToken } from "../models/Admin";
import { User, UserDocument } from "../models/User";
import { Doctor, DoctorDocument } from "../models/Doctor";
import { Admin, AdminDocument } from "../models/Admin";
import { Record, RecordBrief, RecordDocument} from "../models/records/Record";
import { Entry, EntryDocument} from "../models/records/Entry";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";
import "../config/passport";
import { profile } from "winston";
import { PersonnelDocument, UserInfo } from "../models/Personnel";
import { DocumentProvider } from "mongoose";

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response) => {
    if (req.user) {
        console.log("GET LOGIN WITH USER");
        return res.send({user: req.user});
    }
    console.log("GET LOGIN WITHOUT USER");
    return res.send();
};

/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log("POST LOGIN");
    // console.log(req.body);
    
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({min: 1});
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        //return res.redirect("/login");
        return res.status(400).send({msg: "errors"});
    }

    const usertype = req.body.usertype;

    switch (usertype){
        case "user": {
            passport.authenticate("userLocal", (err: Error, user: UserDocument, info: IVerifyOptions) => {
                console.log("\n***************USER LOGIN***************");
                console.log(user);
                console.log("****************************************\n");

                if (err) { return next(err); }
                if (!user) {
                    console.log("POST LOGIN ERROR");
                    return res.status(400).send({user: null, msg: "Oops something went wrong"});
                }
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    console.log("POST LOGIN SUCCESS");
                    console.log(user);
                    return res.status(200).send({user: user, msg: "You have logged in!"});
        
                });
            })(req, res, next);

            break;
        }
        case "doctor": {
            passport.authenticate("doctorLocal", (err: Error, user: DoctorDocument, info: IVerifyOptions) => {
                console.log("\n***************DOCT LOGIN***************");
                console.log(user);
                console.log("****************************************\n");

                if (err) { return next(err); }
                if (!user) {
                    console.log("POST LOGIN ERROR");
                    return res.status(400).send({user: null, msg: "Oops something went wrong"});
                }
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    console.log("POST LOGIN SUCCESS");
                    console.log(user);
                    return res.status(200).send({user: user, msg: "You have logged in!"});
        
                });
            })(req, res, next);

            break;
        }
        case "admin": {
            passport.authenticate("adminLocal", (err: Error, user: AdminDocument, info: IVerifyOptions) => {
                console.log("\n***************ADMIN LOGIN***************");
                console.log(user);
                console.log("****************************************\n");

                if (err) { return next(err); }
                if (!user) {
                    console.log("POST LOGIN ERROR");
                    return res.status(400).send({user: null, msg: "Oops something went wrong"});
                }
                req.logIn(user, (err) => {
                    if (err) { return next(err); }
                    console.log("POST LOGIN SUCCESS");
                    console.log("Admin: %s", user);
                    return res.status(200).send({user: user, msg: "You have logged in!"});
        
                });
            })(req, res, next);

            break;
        }
        default:{
            return res.status(400).json({msg: "Usertype not supported"});
        }

    }
 
 };

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
    req.logout();
    req.session.destroy(function (err) {
        res.json({ msg: "Logged out!" });
    });
};

/**a
 * GET /signup
 * Signup page.
 */
export const getSignup = (req: Request, res: Response) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.json({status: "NOT_LOGGED_IN"});

};

/**
 * GET /account
 * Profile page.
 */
export const getAccount = (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    User.findById(user._id, (err, user: UserDocument) =>{
        if (err){
            console.log(err);
            return res.status(400).send(err);
        }
        return res.json({
            "email": user.email,
            "name": user.profile.name,
            "gender": user.profile.gender,
            "birthday": user.profile.birthday,
            "age": user.age,
        });
    });
};

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    check("email", "Please enter a valid email address.").isEmail();
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).send(errors);
    }

    const user = req.user as UserDocument;


    User.findById(user._id, (err, user: UserDocument) => {
        if (err) { 
            console.log(err);
            return next(err); }
        user.email = req.body.email || "";
        user.profile.name = req.body.name || "";
        user.profile.gender = req.body.gender || "";
        user.profile.birthday = req.body.birthday || "";  // update birthday attribute value - success
        user.profile.location = req.body.location || "";
        user.profile.website = req.body.website || "";
        user.save((err: WriteError) => {
            if (err) {
                if (err.code === 11000) {
                    console.log(err);
                    return res.status(400).json({msg: "The email address you have entered is already associated with an account."});
                }
                return next(err);
            }
            res.status(200).json({ msg: "Profile information has been updated." });
        });
    });
};

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    check("confirmPassword", "Passwords do not match").equals(req.body.password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }

    const user = req.user as UserDocument;
    User.findById(user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        user.password = req.body.password;
        user.save((err: WriteError) => {
            if (err) { return next(err); }
            req.flash("success", { msg: "Password has been changed." });
            res.redirect("/account");
        });
    });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    User.remove({ _id: user.id }, (err) => {
        if (err) { return next(err); }
        req.logout();
        req.flash("info", { msg: "Your account has been deleted." });
        res.redirect("/");
    });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export const getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.params.provider;
    const user = req.user as UserDocument;
    User.findById(user.id, (err, user: any) => {
        if (err) { return next(err); }
        user[provider] = undefined;
        user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
        user.save((err: WriteError) => {
            if (err) { return next(err); }
            req.flash("info", { msg: `${provider} account has been unlinked.` });
            res.redirect("/account");
        });
    });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    User
        .findOne({ passwordResetToken: req.params.token })
        .where("passwordResetExpires").gt(Date.now())
        .exec((err, user) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("errors", { msg: "Password reset token is invalid or has expired." });
                return res.redirect("/forgot");
            }
            res.render("account/reset", {
                title: "Password Reset"
            });
        });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = (req: Request, res: Response, next: NextFunction) => {
    check("password", "Password must be at least 4 characters long.").isLength({ min: 4 });
    check("confirm", "Passwords must match.").equals(req.body.password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("back");
    }

    async.waterfall([
        function resetPassword(done: Function) {
            User
                .findOne({ passwordResetToken: req.params.token })
                .where("passwordResetExpires").gt(Date.now())
                .exec((err, user: any) => {
                    if (err) { return next(err); }
                    if (!user) {
                        req.flash("errors", { msg: "Password reset token is invalid or has expired." });
                        return res.redirect("back");
                    }
                    user.password = req.body.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    user.save((err: WriteError) => {
                        if (err) { return next(err); }
                        req.logIn(user, (err) => {
                            done(err, user);
                        });
                    });
                });
        },
        function sendResetPasswordEmail(user: UserDocument, done: Function) {
            const transporter = nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: "express-ts@starter.com",
                subject: "Your password has been changed",
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                req.flash("success", { msg: "Success! Your password has been changed." });
                done(err);
            });
        }
    ], (err) => {
        if (err) { return next(err); }
        res.redirect("/");
    });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
export const getForgot = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.render("account/forgot", {
        title: "Forgot Password"
    });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export const postForgot = (req: Request, res: Response, next: NextFunction) => {
    check("email", "Please enter a valid email address.").isEmail();
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/forgot");
    }

    async.waterfall([
        function createRandomToken(done: Function) {
            crypto.randomBytes(16, (err, buf) => {
                const token = buf.toString("hex");
                done(err, token);
            });
        },
        function setRandomToken(token: AuthToken, done: Function) {
            User.findOne({ email: req.body.email }, (err, user: any) => {
                if (err) { return done(err); }
                if (!user) {
                    req.flash("errors", { msg: "Account with that email address does not exist." });
                    return res.redirect("/forgot");
                }
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user.save((err: WriteError) => {
                    done(err, token, user);
                });
            });
        },
        function sendForgotPasswordEmail(token: AuthToken, user: UserDocument, done: Function) {
            const transporter = nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
            const mailOptions = {
                to: user.email,
                from: "casey.yzpan@gmail.com",
                subject: "Reset your password on WellBee",
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                req.flash("info", { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
                done(err);
            });
        }
    ], (err) => {
        if (err) { return next(err); }
        res.redirect("/forgot");
    });
};


// /**
//  * POST /account/add-record
//  * User adds new record.
//  */
// export const postAddRecord2 = (req: Request, res: Response, next: NextFunction) => {
//     const bodyData = req.body;

//     const newRecord = new Record({
//         type: bodyData.recordtype,
//         createdAt: bodyData.date,
//     });

//     console.log("1\n");

//     for ( const entry of bodyData.entries ){
//         //const entryData = JSON.parse(entry);
//         const newEntry = new Entry(entry.param, entry.val, entry.unit);
//         newRecord.entries.push(newEntry);
//     }

//     console.log("2\n");

//     newRecord.save((err) => {
//         if (err) {
//             console.log(err);
//             return next(err);
//         }
//     });

//     const user = req.user;
//     console.log("3\n");

//     User.findOne({email: user}, (err, existingUser: UserDocument) => {
//         if (err){ 
//             console.log(err);
//             return next(err); 
//         }
//         if (existingUser){ 
//             existingUser.recordBriefList.push(newRecord._id);
//             existingUser.save((err) => {
//                 return next(err);
//             });
//             return res.send("Record successfully added.");
//         }
//         return res.send("User not found.");
//     });
// };

/**
 * POST /account/add-record
 * User adds new record.
 */
export const postAddRecord = (req: Request, res: Response, next: NextFunction  )=> {

    console.log("\n********* REQ BODY ***********");
    // console.log(req.body);
    console.log("******************************\n");

    /* Create Record -> Records colletcion*/
    
    const entriesArray: Entry[] = [];

    for ( const entry of req.body.entries ){
        const newEntry = new Entry(entry.param, entry.val, entry.unit);
        entriesArray.push(newEntry);
    }

    const newRecord = new Record({
        type: req.body.type,
        date: req.body.date,
        description: req.body.description,
        entries: entriesArray
    });

    console.log("********* NEW RECORD *********");
    console.log(newRecord);
    console.log("******************************");

    newRecord.save((err) => {
        if (err) { return next(err);}
    });

    /* Create Record Brief -> user */
    const user = req.user as UserDocument;

    User.findById(user._id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        
        const newRecordBrief = new RecordBrief(newRecord._id, newRecord.type, newRecord.date, newRecord.description);

        console.log("********* NEW RECORD BRIEF *********");
        console.log("BEFORE");
        console.log(user.recordBriefList);
        console.log("NEW R BRIEF");
        console.log(newRecordBrief);
        console.log("******************************");

        // This following line evokes error
            // ASYNC HANDLING NEEDED 
        user.recordBriefList.push(newRecordBrief);
        user.save((err: WriteError) => {
            return next(err);
        });

        console.log("\nAFTER");
        console.log(user.recordBriefList);
        console.log("******************************");

        // *** flash not showding => frontend?
        req.flash("success", { msg: "New record successfully added." });
        return res.status(200).send({ 
            newRB: newRecordBrief,
            msg: "New record successfully added." 
        });
    });
};



/**
 * GET / 
 * Get record list of one user
 */
// export const getRecordList2 = (req: Request, res: Response, next: NextFunction) => {
    
//     User.findOne({email: req.user}, (err, existingUser: UserDocument) => {
//         if (err){ return next(err); }
//         if (existingUser){
//             const records = existingUser.recordBriefList;
//             return res.json(JSON.stringify(records));
//         }
//         return res.send("User not found.");
//     });
// };


/**
 * GET / 
 * Get record list of one user
 */
export const getRecordList = (req: Request, res: Response, next: NextFunction  )=> {
    const user = req.user as UserDocument;

    User.findById(user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        return res.status(200).send(JSON.stringify(user.recordBriefList));
    });
};


export const getRecord = (req: Request, res: Response, next: NextFunction) => {
    Record.findById(req.body.recordID, (err, existingRecord: RecordDocument) => {
        if (err){ return next(err); }
        if (existingRecord){
            return res.status(200).json(existingRecord);
        }
        return res.status(400).json({msg: "User not found"});
    });
};

export const authorizeRecord = (req: Request, res: Response, next: NextFunction) => {
    let user = req.user as UserDocument;
    const userInfo: UserInfo = {name: user.name, email: user.email, age: user.age};
    
    if (req.body.targetUsertype = "user"){
        User.findOne({email: req.body.targetUserEmail}, (err, targetUser: UserDocument) =>{
            if (err){
                console.log(err);
                return next(err);
            }
            if (!targetUser){
                return res.status(400).json({msg: "Target User not found."});
            }
            targetUser.holdsAuthList.push(userInfo);
            const targetUserInfo: UserInfo = {name: targetUser.name, email: targetUser.email, age: targetUser.age};
            user.grantedAuthList.push(targetUserInfo);
            targetUser.save((err: WriteError) => {
                if (err){
                    console.log(err);
                    return next(err);
                }
                user.save((err: WriteError)=>{
                    if (err){
                        console.log(err);
                        return next(err);
                    }
                })
            });
            
        });
    }
    else if (req.body.targetUsertype = "doctor"){
        Doctor.findOne({email: req.body.targetUserEmail}, (err, targetDoctor: DoctorDocument)=>{
            if (err){
                console.log(err);
                return next(err);
            }
            if (!targetDoctor){
                return res.status(400).json({msg: "Target User not found."});
            }
            targetDoctor.holdsAuthList.push(userInfo);
            const targetUserInfo: UserInfo = {name: targetDoctor.name, email: targetDoctor.email, age: targetDoctor.age};
            user.grantedAuthList.push(targetUserInfo);
            targetDoctor.save((err: WriteError) => {
                if (err){
                    console.log(err);
                    return next(err);
                }
                user.save((err: WriteError)=>{
                    if (err){
                        console.log(err);
                        return next(err);
                    }
                })
            });
        });
        
    }
    
};

export const viewAuthUser = (req: Request, res: Response, next: NextFunction) => {
    let user = req.user as PersonnelDocument;
    if (user.usertype == "user"){
        User.findById(user._id, (err, user: UserDocument)=>{
            if (err){
                console.log(err);
                return next(err);
            }
            if (user){
                console.log("======Authorized Users======");
                console.log(user.holdsAuthList);
                return res.status(200).json(user.holdsAuthList);
            }
            return;
        })
    }
    else if (user.usertype == "doctor"){
        Doctor.findById(user._id, (err, user: DoctorDocument)=>{
            if (err){
                console.log(err);
                return next(err);
            }
            if (user){
                console.log("======Authorized Users======");
                console.log(user.holdsAuthList);
                return res.status(200).json(user.holdsAuthList);
            }
            return;
        })
    }
    return;
}

export const ViewuserRecord = (req: Request, res: Response, next: NextFunction) => {
    let user = req.user as PersonnelDocument;
}
