import { Router } from "express";
import { LeadControllers } from "./lead.controller";

const router = Router();

router.post('/contact', LeadControllers.createLead);

export const LeadRoutes = router;
