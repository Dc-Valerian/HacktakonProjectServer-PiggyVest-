import mongoose from "mongoose";
import { WalletData } from "../AllInterfaces/AllInterface";

interface MainData extends WalletData, mongoose.Document {}

const WalletSchema = new mongoose.Schema<WalletData>(
	{
		Balance: {
			type: Number,
		},

		credit: {
			type: Number,
		},

		debit: {
			type: Number,
		},

		quickSave: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "quicksaves",
			},
		],

		saveLock: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "savelocks",
			},
		],

		Target: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "targets",
			},
		],

		invest: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "invests",
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("wallets", WalletSchema);
