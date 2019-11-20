import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { EntryDocument } from "./Entry";

export enum RecordType {
    COMPLETE_BLOOD_COUNT
}

export interface RecordDocument extends mongoose.Document {
    // RecordDocument interface
    type: RecordType;
    createdAt: Date;

    entries: EntryDocument[];

}


export const recordSchema = new mongoose.Schema({
    // personnel Schema
    type: RecordType,
    id: String,
    createdAt: Date,

    entries: Array,

},{ timestamps : true });
                      
    
export const Record = mongoose.model<RecordDocument>("Record", recordSchema);