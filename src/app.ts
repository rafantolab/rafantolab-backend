import express, { Request, Response } from "express";
import cors from "cors";
import { LeadRoutes } from "./app/modules/lead/lead.route";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://rafantolab.onrender.com",
    "https://www.rafantolab.com",
];

app.use(express.json());
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin as string)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    );

    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
