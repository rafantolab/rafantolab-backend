import { model, Schema } from "mongoose";
import { ILead } from "./lead.interface";


const leadSchema = new Schema<ILead> ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    service: {type: String, required: true},
    budget: {type: String, required: true},
    message: {type: String, required: true}
},
{
    timestamps: true,
    versionKey: false
})

export const Lead = model<ILead>('Lead', leadSchema)