import { Request, Response } from "express";
import investModel from "../Model/investModel";
import UserModel from "../Model/UserModel";
import WalletModel from "../Model/WalletModel";

export const CreatInvestify = async (req: Request, res: Response) => {
	try {
		const getUser = await UserModel.findById(req.params.id);
		// const getWallet = await WalletModel.findById(getUser?._id)
		const dater = new Date().toDateString();
		if (getUser?.isAdmin === true) {
			const { title, description, category, duration, amountPerUnit } =
				req.body;
			const creating = await investModel.create({
				title,
				description,
				category,
				duration,
				startTime: dater,
				amountPerUnit,
				totalUnit: 200,
				status: true,
			});

			return res.status(200).json(creating);
		} else {
			return res.status(404).json({
				message: "UnAuthorized User",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred while creating",
		});
	}
};
