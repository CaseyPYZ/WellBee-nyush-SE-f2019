import mongoose, { Document } from "mongoose";

export interface EntryDocument extends mongoose.Document {
    // RecordDocument interface
    parameter: string;
    value: string;
    unit: string;
}


export class Entry{
    parameter: string;
    value: string;
    unit: string;
    constructor(param: string, val: string, unit: string){
        this.parameter = param;
        this.value = val;
        this.unit = unit;
    }
} 