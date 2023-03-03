import mongoose from "mongoose";
import { Inves } from "../AllInterfaces/AllInterface";

interface MainData extends Inves, mongoose.Document {}

const InvestSchema = new mongoose.Schema<Inves>(
	{
		title: {
			type: String,
		},

		status: {
			type: Boolean,
		},

		startTime: {
			type: String,
		},

		percentageInterest: {
			type: Number,
		},

		duration: {
			type: String,
		},

		category: {
			type: String,
		},

		totalUnit: {
			type: Number,
		},

		description: {
			type: String,
		},

		amountPerUnit: {
			type: Number,
		},

		investors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "investors",
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("investments", InvestSchema);
