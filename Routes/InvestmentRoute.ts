import { CreatInvestify } from "../Controllers/InvestMentController";
import express from "express";

const router = express.Router();

router.post("/invest/:id", CreatInvestify);

export default router;
