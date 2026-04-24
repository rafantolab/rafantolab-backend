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

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        console.log("🔍 Request origin:", origin); // Add this
        console.log("🔍 Allowed origins:", allowedOrigins);
        
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(o => origin.startsWith(o))) {
            return callback(null, true);
        }
        
        console.log("❌ Origin rejected:", origin); // Add this
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.some((o) => origin.startsWith(o))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS",
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Immediately respond to preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
