"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const lead_route_1 = require("./app/modules/lead/lead.route");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://rafantolab.onrender.com",
    "https://www.rafantolab.com",
    "https://rafantolab.vercel.app",
];
const corsOptions = {
    origin: (origin, callback) => {
        console.log("🔍 Request origin:", origin); // Add this
        console.log("🔍 Allowed origins:", allowedOrigins);
        if (!origin)
            return callback(null, true);
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
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    // Immediately respond to preflight
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});
app.options("/{*path}", (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/v1", lead_route_1.LeadRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});
exports.default = app;
