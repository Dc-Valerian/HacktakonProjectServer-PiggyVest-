import { CreatInvestify, InvestNow } from "../Controllers/InvestMentController";
import express from "express";

const router = express.Router();

router.post("/invest/:id", CreatInvestify);
router.post("/investnow/:id/:walletId/:InvestmentId", InvestNow);

export default router;
