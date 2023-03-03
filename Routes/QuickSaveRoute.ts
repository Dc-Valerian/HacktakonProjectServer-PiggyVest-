import {
	CreateQuickSave,
	ClaimDailyInterest,
} from "../Controllers/QuickSaveController";
import express from "express";
const router = express.Router();

router.post("/saveQuick/:walletId", CreateQuickSave);
router.post("/interest/:SaveId", ClaimDailyInterest);

export default router;
