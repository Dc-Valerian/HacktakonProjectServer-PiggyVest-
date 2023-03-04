import { Request, Response } from "express";
import UserModel from "../Model/UserModel";
import WalletModel from "../Model/WalletModel";
import HistoryModel from "../Model/HistoryModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// export const GetAllUser = a

export const RegisterUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, userName, phoneNumber } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const dater = Date.now();

		const generateNumber = Math.floor(Math.random() * 78) + dater;
		let num = 234;

		const regUser = await UserModel.create({
			name,
			email,
			userName,
			password: hash,
			phoneNumber: num + phoneNumber,
			verified: true,
			accountNumber: generateNumber,
			isAdmin: false,
		});

		const createWallet = await WalletModel.create({
			_id: regUser?._id,
			Balance: 1000,
			credit: 0,
			debit: 0,
			owner:regUser.name,
		});

		regUser?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id));

		regUser.save();

		res.status(200).json({
			message: "successfully created",
			data: regUser,
			token: jwt.sign({ _id: regUser._id }, "ddkg-57sdhgs83-ujzfnst-58dndg"),
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred",
			err,
		});
	}
};

// Transfer to another wallet

export const MakeTransfer = async (req: Request, res: Response) => {
	try {
		const { accountNumber, amount } = req.body;

		const referenceGeneratedNumber = Math.floor(Math.random() * 67485753) + 243;

		//RECIEVER ACCOUNT
		const getReciever = await UserModel.findOne({ accountNumber });
		const getRecieverWallet = await WalletModel.findById(getReciever?._id);

		// SENDER ACCOUNT
		const getUser = await UserModel.findById(req.params.UserId);
		const getUserWallet = await WalletModel.findById(req.params.WalletID);

		if (getUser && getReciever) {
			if (amount > getUserWallet?.Balance!) {
				return res.status(404).json({
					message: "insufficent fund.",
				});
			} else {
				// undating the sender walllet
				await WalletModel.findByIdAndUpdate(getUserWallet?._id, {
					Balance: getUserWallet?.Balance! - amount,
					credit: 0,
					debit: amount,
				});

				const createHisorySender = await HistoryModel.create({
					message: `you have sent ${amount} to ${getReciever?.name}`,
					transactionType: "debit",
					transactionReference: referenceGeneratedNumber,
				});

				getUser?.history?.push(
					new mongoose.Types.ObjectId(createHisorySender?._id),
				);

				getUser?.save();

				// reciever wallet
				await WalletModel.findByIdAndUpdate(getRecieverWallet?._id, {
					Balance: getRecieverWallet?.Balance! + amount,
					credit: amount,
					debit: 0,
				});

				const createHisoryReciever = await HistoryModel.create({
					message: `an amount of ${amount} has been sent to you by ${getUser?.name}`,
					transactionType: "credit",
					transactionReference: referenceGeneratedNumber,
				});
				getReciever?.history?.push(
					new mongoose.Types.ObjectId(createHisoryReciever?._id),
				);
				getReciever?.save();
			}

			return res.status(200).json({
				message: "Transaction successfull",
			});
		} else {
			return res.status(404).json({
				message: "Account not found",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred",
			err,
		});
	}
};

//fund wallet from bank
export const fundWalletFromBank = async (req: Request, res: Response) => {
	try {
		const getUser = await UserModel.findById(req.params.userId);
		const getWallet = await WalletModel.findById(req.params.walletId);

		const { amount, transactinRef } = req.body;
		await WalletModel.findByIdAndUpdate(getWallet?._id, {
			Balance: getWallet?.Balance + amount,
		});

		const createHisorySender = await HistoryModel.create({
			message: `an amount of ${amount} has been credited to your wallet`,
			transactionType: "credit",
			transactionReference: transactinRef,
		});

		getUser?.history?.push(
			new mongoose.Types.ObjectId(createHisorySender?._id),
		);

		res.status(200).json({
			message: "Wallet updated successfully",
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred",
			err,
		});
	}
};


// To Get a Particular User detail
export const UserDetail = async (req: Request, res: Response) => {
	try {
		const getUser = await UserModel.findById(req.params.id).populate({
			path : "wallet"
		});

		res.status(200).json({
			message: `Successfully got ${getUser?.name} detail's`,
			data: getUser,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred",
			err,
		});
	}
};
