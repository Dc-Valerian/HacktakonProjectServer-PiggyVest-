import mongoose from "mongoose";
import { InvestorData } from "../AllInterfaces/AllInterface";

interface MainData extends InvestorData, mongoose.Document {}

const InvestorSchema = new mongoose.Schema<InvestorData>(
	{
		investorId: {
			type: String,
		},

		amount: {
			type: Number,
		},
		owner:{
			type:String
		},

		unit: {
			type: Number,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("investors", InvestorSchema);
