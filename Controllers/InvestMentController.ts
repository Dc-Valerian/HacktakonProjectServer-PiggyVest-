import { Request, Response } from "express";
import investModel from "../Model/investModel";
import UserModel from "../Model/UserModel";
import WalletModel from "../Model/WalletModel";
import Investors from "../Model/Investors";
import mongoose from "mongoose";

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
				owner:getUser?.name
			});

			return res.status(200).json(creating);
		} else {
			return res.status(404).json({
				message: "UnAuthorized User",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred while creating ",
			data:err
		});
	}
};

export const InvestNow = async (req: Request, res: Response) => {
	try {
		const getWallet = await WalletModel.findById(req.params.walletId);
		const { unit } = req.body;

		const getInvestment = await investModel.findById(req.params.InvestmentId);
		const getUser = await UserModel.findById(req.params.userId);
		// checking how much is left in my wallet account
		if (getInvestment?.amountPerUnit! * unit > getWallet?.Balance!) {
			return res.status(404).json({
				message: "insufficient funds",
			});
		} else {
			const createInvestor = await Investors.create({
				investorId: getUser?._id,
				amount: getInvestment?.amountPerUnit! * unit,
				unit,
			});
			// push the investor to this investment
			getInvestment?.investors?.push(
				new mongoose.Types.ObjectId(createInvestor?._id),
			);
			getInvestment?.save();

			console.log(getInvestment);
			//pushing the investment to my wallet so i can see all my investments
			await WalletModel.findByIdAndUpdate(getWallet?._id, {
				$push: { myInvestment: getInvestment?._id },
			});

			// updating my wallet balance
			await WalletModel.findByIdAndUpdate(getWallet?._id, {
				Balance: getWallet?.Balance! - getInvestment?.amountPerUnit! * unit,
			});

			// updating the unit
			await investModel.findByIdAndUpdate(getInvestment?._id, {
				totalUnit: getInvestment?.totalUnit! - unit,
			});

			return res.status(200).json({
				message: "successfull",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred while creating",
			err
		});
	}
};
