import express from "express";
import {
	RegisterUser,
	MakeTransfer,
	fundWalletFromBank,
	UserDetail,
} from "../Controllers/UserController";

const router = express.Router();

router.post("/register", RegisterUser);
router.get("/:id/userdetail", UserDetail);
router.post("/sendmoney/:UserId/:WalletID", MakeTransfer);
router.post("/creditWalletBank/:userId/:walletId", fundWalletFromBank);

export default router;
