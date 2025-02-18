import express from "express";
import { getHistory, taxCalculation } from "../controllers/taxController.js";
const router =express.Router();
router.post("/calculate",taxCalculation);
router.get('/history',getHistory);

export default router;