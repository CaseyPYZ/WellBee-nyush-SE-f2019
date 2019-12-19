import passport from "passport";
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
import { PersonnelDocument, UserInfo } from "../models/Personnel";
import * as userFactory from "./user_factory";


/**
 * POST /signup
 * Create a new local account.
 */
export const postSignup = (req: Request, res: Response, next: NextFunction) => {

    /* Global steps */


    check("email", "Email is not valid").isEmail();
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    check("confirmPassword", "Passwords do not match").equals(req.body.password);
    // eslint-disable-next-line @typescript-eslint/camelcase
    sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).send(errors);
    }

    /* User factory */

    userFactory.createUser(req, res, next);
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

    console.log(req.body);

    const usertype = req.body.usertype;

    console.log(usertype);

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
                    // console.log(req.headers)
                    // console.log(user);
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
        res.status(200).json({ msg: "Logged out!" });
    });
};


/**
 * GET /account
 * Profile page.
 */
export const getAccount = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;
    if (user.usertype == "user"){
        User.findById(user.id, (err, user: UserDocument) => {
            if (err) {
                return next(err);
            }
            return res.json(user.profile);
        });
    }
    else if (user.usertype == "doctor"){
        Doctor.findById(user.id, (err, user: UserDocument) => {
            if (err) {
                return next(err);
            }
            return res.json(user.profile);
        });
    }
    else if (user.usertype == "admin"){
        User.findById(user.id, (err, user: UserDocument) => {
            if (err) {
                return next(err);
            }
            return res.json(user.profile);
        });
    }
    
};

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;

    if (user.usertype == "user"){
        User.findById(user._id, (err, user: UserDocument) => {
            if (err) { 
                console.log(err);
                return next(err); }
            user.name = req.body.name || "";
            user.profile.name = req.body.name || "";
            user.profile.age = req.body.age || "";
            user.profile.gender = req.body.gender || "";
            user.profile.birthday = req.body.birthday || "";  // update birthday attribute value - success
            user.profile.location = req.body.location || "";
            user.profile.website = req.body.website || "";
            user.save((err: WriteError) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ profile: user.profile, msg: "Profile information has been updated." });
            });
        });
    }
    else if (user.usertype == "doctor"){
        Doctor.findById(user._id, (err, user: DoctorDocument) => {
            if (err) { 
                console.log(err);
                return next(err); }
            user.name = req.body.name || "";
            user.profile.name = req.body.name || "";
            user.profile.age = req.body.age || "";
            user.profile.gender = req.body.gender || "";
            user.profile.birthday = req.body.birthday || "";  // update birthday attribute value - success
            user.profile.location = req.body.location || "";
            user.profile.website = req.body.website || "";
            user.save((err: WriteError) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ profile: user.profile, msg: "Profile information has been updated." });
            });
        });
    }
    else if (user.usertype == "admin"){
        Admin.findById(user._id, (err, user: AdminDocument) => {
            if (err) { 
                console.log(err);
                return next(err); }
            user.name = req.body.name || "";
            user.profile.name = req.body.name || "";
            user.profile.age = req.body.age || "";
            user.profile.gender = req.body.gender || "";
            user.profile.birthday = req.body.birthday || "";  // update birthday attribute value - success
            user.profile.location = req.body.location || "";
            user.profile.website = req.body.website || "";
            user.save((err: WriteError) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ profile: user.profile, msg: "Profile information has been updated." });
            });
        });
    }
};

/**
 * GET /account
 * Profile page.
 */
export const getEmergencyProfile = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;
    if (user.usertype == "user"){
        User.findById(user.id, (err, user: UserDocument) => {
            if (err) {
                return next(err);
            }
            return res.json(user.EmergencyProfile);
        });
    }
    else{
        return res.status(400).json({msg: "Usertype is not user. Only users have emergency profile"});
    }
};

/**
 * POST /account/password
 * Update Emergency profile.
 */

export const UpdateEmergencyProfile = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;

    if (user.usertype == "user"){
        User.findById(user._id, (err, user: UserDocument) => {
            if (err){
                console.log(err);
                return next(err);
            }
            user.EmergencyProfile.name = req.body.name;
            user.EmergencyProfile.age = req.body.age;
            user.EmergencyProfile.Allergies = req.body.Allergies;
            user.EmergencyProfile.BloodType = req.body.BloodType;
            user.EmergencyProfile.DiseaseHistory = req.body.DiseaseHistory;
            user.save((err: WriteError) =>{
                if (err){
                    return next(err);
                }
                return res.status(200).json({EmergencyProfile: user.EmergencyProfile, msg: "Emergency profile has been updated"});
            });
        });
    }
    else{
        return res.status(400).json({msg: "Usertype is not user. Only users have emergency profile"});
    }
};


/**
 * POST /account/delete
 * Delete user account.
 * TODO: We need to delete the records associated with the account for users
 */
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;
    switch (user.usertype){
        case "user": {
            User.findById(user.id, (err, user: UserDocument) => {
                if (err){
                    console.log(err);
                    next(err);
                }
                if (user){
                    user.recordList.forEach((id)=>{
                        User.remove({_id: id}, (err) => {
                            if (err) {return next(err);}
                        });
                    });
                }
                User.remove({ _id: user.id }, (err) => {
                    if (err) { return next(err); }
                    req.logout();
                });
                return res.status(200).json({msg: "Account successfully deleted"});              
            });
            break;
        }
        case "doctor": {
            Doctor.remove({ _id: user.id }, (err) => {
                if (err) { return next(err); }
                req.logout();
            });
            return res.status(200).json({msg: "Account successfully deleted"});  
            break;
        }
        case "admin": {
            Admin.remove({ _id: user.id }, (err) => {
                if (err) { return next(err); }
                req.logout();
            });
            return res.status(200).json({msg: "Account successfully deleted"});  
            break;
        }
    }
};


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
export const getRecordList = (req: Request, res: Response, next: NextFunction  )=> {
    const user = req.user as UserDocument;

    User.findById(user.id, (err, user: UserDocument) => {
        if (err) { return next(err); }
        return res.status(200).json(user.recordBriefList);
    });
};

/**
 * GET / 
 * Get a specific record by recordID
 */
export const getRecord = (req: Request, res: Response, next: NextFunction) => {
    Record.findById(req.body.recordID, (err, existingRecord: RecordDocument) => {
        if (err){ return next(err); }
        if (existingRecord){
            return res.status(200).json(existingRecord);
        }
        return res.status(400).json({msg: "Record not found"});
    });
};


/**
 * POST /
 * Give a user/doctor the access to view the record;
 */
export const authorizeRecord = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    const userInfo: UserInfo = {name: user.name, email: user.email, usertype: user.usertype};
    

    if (req.body.targetUsertype == "user"){
        User.findOne({email: req.body.targetUserEmail}, (err, targetUser: UserDocument) =>{
            if (err){
                console.log(err);
                return next(err);
            }
            if (!targetUser){
                return res.status(400).json({msg: "Target User not found."});
            }
            let existed = false;
            targetUser.holdsAuthList.forEach((AuthUser: UserInfo)=>{
                if (AuthUser.email == user.email){
                    existed = true;
                }
            });
            if (existed){
                return res.status(400).json({msg: "This user already has access to your records"});
            }
            targetUser.holdsAuthList.push(userInfo);
            const targetUserInfo: UserInfo = {name: targetUser.name, email: targetUser.email, usertype: targetUser.usertype};
            targetUser.save((err: WriteError) => {
                if (err){
                    console.log(err);
                    return next(err);
                }
                User.findById(user.id, (err, user: UserDocument) => {
                    if (err){
                        return next(err);
                    }
                    if (user){
                        user.grantedAuthList.push(targetUserInfo);
                        user.save((err: WriteError)=>{
                            if (err){
                                console.log(err);
                                return next(err);
                            }
                            return res.status(200).json({msg: "User successfully authorized. Now all your record can be seen by the user"});
                        });
                    }
                });
            });
            
        });
    }
    else if (req.body.targetUsertype == "doctor"){
        Doctor.findOne({email: req.body.targetUserEmail}, (err, targetDoctor: DoctorDocument)=>{
            if (err){
                console.log(err);
                return next(err);
            }
            console.log(targetDoctor);
            if (!targetDoctor){
                return res.status(400).json({msg: "Target Doctor not found."});
            }
            let existed = false;
            targetDoctor.holdsAuthList.forEach((AuthUser: UserInfo)=>{
                if (AuthUser.email == user.email){
                    existed = true;
                }
            });
            if (existed){
                return res.status(400).json({msg: "This doctor already has access to your records"});
            }
            targetDoctor.holdsAuthList.push(userInfo);
            const targetUserInfo: UserInfo = {name: targetDoctor.name, email: targetDoctor.email, usertype: targetDoctor.usertype};
            console.log(targetUserInfo);
            targetDoctor.save((err: WriteError) => {
                if (err){
                    console.log(err);
                    return next(err);
                }
                User.findById(user.id, (err, user: UserDocument) => {
                    if (err){
                        return next(err);
                    }
                    if (user){
                        user.grantedAuthList.push(targetUserInfo);
                        user.save((err: WriteError)=>{
                            if (err){
                                console.log(err);
                                return next(err);
                            }
                            return res.status(200).json({msg: "User successfully authorized. Now all your record can be seen by the user"});
                        });
                    }
                });
            });
        });
        
    }
    else{
        return res.status(400).json({msg: "User type not supported"});
    }
};


/** 
 * Get /
 * Get all the users received authorization from.
 */
export const viewAuthUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PersonnelDocument;
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
        });
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
        });
    }
    return;
};

/**
 * GET /
 * Get the recordBrief List of a specific User.
 */
export const ViewuserRecord = (req: Request, res: Response, next: NextFunction) => {
    const srcuser = req.user as PersonnelDocument;
    User.findOne({email: req.body.targetUserEmail}, (err, user: UserDocument) => {
        if (err){
            console.log(err);
            return next(err);
        }
        if (user){
            let flag = false;
            user.grantedAuthList.forEach((user: UserInfo) => {
                if (user.email == srcuser.email){
                    flag = true;
                }
            });
            if (flag || srcuser.usertype == "admin"){
                return res.status(200).json(user.recordBriefList);
            }
            return res.status(400).json({msg: "Permission denied."});
        }
    });
};

/**
 * GET /
 * Get all users who can access your records.
 * Only User have this functionality.
 */

export const ViewAuthedUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument;
    return res.status(200).json(user.grantedAuthList);
};

/**
 * POST /
 * Remove the authorization of a particular user
 * req.body.targetUserEmail, req.body.targetUsertype
 */

 export const RemoveAuth = (req: Request, res: Response, next: NextFunction) => {
     const user = req.user as UserDocument;

     User.findById(user.id, (err, user: UserDocument) => {
        let idx = -1;
        for (let index=0; index < user.grantedAuthList.length; index ++){
            if (user.grantedAuthList[index].email == req.body.targetUserEmail){
                idx = index;
                break;
            }
        }
        if (idx >= 0){
            user.grantedAuthList.splice(idx, 1);
            user.save((err: WriteError) => {
                if (err) {return next(err);}
                if (req.body.targetUsertype == "user"){
                    User.findOne({email: req.body.targetUserEmail}, (err, targetUser: UserDocument) => {
                        let targetidx = -1;
                        for (let index=0; index < targetUser.holdsAuthList.length; index ++){
                            if (targetUser.holdsAuthList[index].email == user.email){
                                targetidx = index;
                                break;
                            }
                        }
                        if (targetidx >= 0){
                            targetUser.holdsAuthList.splice(targetidx, 1);
                            targetUser.save((err: WriteError) => {
                                if (err){
                                    console.log(err);
                                    return next(err);
                                }
                                console.log(user);
                                console.log(targetUser);
                                return res.status(200).json({msg: "You have successfully remove the user's access to your records"});
                            });
                        }
                    });
                }
                else if (req.body.targetUsertype == "doctor"){
                    Doctor.findOne({email: req.body.targetUserEmail}, (err, targetDoctor: DoctorDocument) => {
                        let targetidx = -1;
                        for (let index=0; index < targetDoctor.holdsAuthList.length; index ++){
                            if (targetDoctor.holdsAuthList[index].email == user.email){
                                targetidx = index;
                                break;
                            }
                        }
                        if (targetidx >= 0){
                            targetDoctor.holdsAuthList.splice(targetidx, 1);
                            targetDoctor.save((err: WriteError) => {
                                if (err){
                                    console.log(err);
                                    return next(err);
                                }
                                console.log(user);
                                console.log(targetDoctor);
                                return res.status(200).json({msg: "You have successfully remove the doctor's access to your records"});
                            });
                        }
                    });
                }
            });
        
        }
        else{
            res.status(400).json({msg: "The user does not have access to your records"});
        }
     });
     
 };