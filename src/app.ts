import express, { Request, Response } from "express";
import cors from "cors";
import { LeadRoutes } from "./app/modules/lead/lead.route";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://rafantolab.onrender.com",
    "https://www.rafantolab.com",
    "https://rafantolab.vercel.app",
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
