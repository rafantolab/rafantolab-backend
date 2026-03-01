"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = require("mongoose");
const leadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});
exports.Lead = (0, mongoose_1.model)('Lead', leadSchema);
