"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const lead_route_1 = require("./app/modules/lead/lead.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", 'https://rafantolab.onrender.com/', 'https://www.rafantolab.com/'],
}));
app.use("/api/v1", lead_route_1.LeadRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to RafantoLab backend",
    });
});
exports.default = app;
