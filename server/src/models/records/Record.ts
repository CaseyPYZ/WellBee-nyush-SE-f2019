import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { Entry, EntryDocument } from "./Entry";

// export enum RecordType {
//     COMPLETE_BLOOD_COUNT
// }

export type RecordType = "COMPLETE_BLOOD_COUNT" | "2" | "3" | "4";

export interface RecordDocument extends mongoose.Document {
    // RecordDocument interface
    type: RecordType;
    createdAt: Date;

    entries: Entry[];

}


export const recordSchema = new mongoose.Schema({
    // personnel Schema
    type: String,
    id: String,
    createdAt: Date,

    entries: Array,

},{ timestamps : true });
                      
    
export const Record = mongoose.model<RecordDocument>("Record", recordSchema);