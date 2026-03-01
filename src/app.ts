import express, { Request, Response } from "express";
import cors from "cors";
import { LeadRoutes } from "./app/modules/lead/lead.route";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", 'https://rafantolab.onrender.com/', 'https://www.rafantolab.com/'],
    }),
);

app.use("/api/v1", LeadRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});

export default app;
