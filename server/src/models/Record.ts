import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type RecordDocument = mongoose.Document & {
    // RecordDocument type

}


const recordSchema = new mongoose.Schema({
    // personnel Schema


},{ timestamps : true });
                      
    
export const Record = mongoose.model<RecordDocument>("Personnel", recordSchema);