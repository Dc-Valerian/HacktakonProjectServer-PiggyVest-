import QuickSave from "../Model/QuickSave";
import { Request, Response } from "express";
import WalletModel from "../Model/WalletModel";

export const CreateQuickSave = async (req: Request, res: Response) => {
	try {
		const { amount } = req.body;
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
};
