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

app.options("*", cors());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.some(o => origin.startsWith(o))) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
