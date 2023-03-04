import mongoose from "mongoose";
import { Quick } from "../AllInterfaces/AllInterface";

interface MainData extends Quick, mongoose.Document {}

const QuickSchema = new mongoose.Schema<Quick>(
	{
		amount: {
			type: Number,
		},

		autoSave: {
			type: Boolean,
		},

		dateTime: {
			type: String,
		},

		interest: {
			type: Number,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("quicksaves", QuickSchema);
