import express from "express";
import {
	RegisterUser,
	MakeTransfer,
	fundWalletFromBank,
} from "../Controllers/UserController";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/sendmoney/:UserId/:WalletID", MakeTransfer);
router.post("/creditWalletBank/:userId/:walletId", fundWalletFromBank);

export default router;
