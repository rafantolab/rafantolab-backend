import { Request, Response } from "express";
import { Lead } from "./lead.model";
import { transporter } from "../../config/email";

const createLead = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, service, budget, message, honeypot } = req.body;
        // console.log(req.body);

        if (honeypot) {
            return res.status(400).json({
                error: "Spam Detected",
            });
        }

        const lead = new Lead({ name, email, phone, service, budget, message });
        const savedLead = await lead.save();

        await transporter.sendMail({
            from: `"Rafantolab" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New Lead from ${name}`,
            html: `
                <h2>New Contact Submission</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Service:</b> ${service}</p>
                <p><b>Budget:</b> ${budget}</p>
                <p><b>Message:</b><br/>${message}</p>
            `,
        });

        res.status(201).json({
            success: true,
            messsage: "Lead saved successfully.",
            savedLead,
        });
    } catch (error) {
        console.log(error)
    }
};

export const LeadControllers = {
    createLead
}