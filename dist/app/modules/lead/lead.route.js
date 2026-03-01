"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRoutes = void 0;
const express_1 = require("express");
const lead_controller_1 = require("./lead.controller");
const router = (0, express_1.Router)();
router.post('/contact', lead_controller_1.LeadControllers.createLead);
exports.LeadRoutes = router;
