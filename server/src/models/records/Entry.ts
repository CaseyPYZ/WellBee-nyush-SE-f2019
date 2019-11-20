import mongoose, { Document } from "mongoose";

export interface EntryDocument extends mongoose.Document {
    // RecordDocument interface
    parameter: string;
    value: number;
    unit: string;
    referenceMIN: number;
    referenceMAX: number;
}