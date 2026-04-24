import express, { Request, Response } from "express";
import cors from "cors";
import { LeadRoutes } from "./app/modules/lead/lead.route";

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "https://rafantolab.onrender.com",
    "https://www.rafantolab.com",
    "https://rafantolab.vercel.app",
    "https://rafantolab.vercel.app/",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(express.json());
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
