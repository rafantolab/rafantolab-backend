"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadControllers = void 0;
const lead_model_1 = require("./lead.model");
const email_1 = require("../../config/email");
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, service, message, honeypot } = req.body;
        // console.log(req.body);
        if (honeypot) {
            return res.status(400).json({
                error: "Spam Detected",
            });
        }
        const lead = new lead_model_1.Lead({ name, email, phone, service, message });
        const savedLead = yield lead.save();
        yield email_1.transporter.sendMail({
            from: `"Rafantolab" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New Lead from ${name}`,
            html: `
                <h2>New Contact Submission</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Service:</b> ${service}</p>
                <p><b>Message:</b><br/>${message}</p>
            `,
        });
        res.status(201).json({
            success: true,
            messsage: "Lead saved successfully.",
            savedLead,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.LeadControllers = {
    createLead
};
