import mongoose from "mongoose";
import { Locks } from "../AllInterfaces/AllInterface";

interface MainData extends Locks, mongoose.Document {}

const SaveLockSchema = new mongoose.Schema<Locks>(
	{
		amount: {
			type: Number,
		},

		lock: {
			type: Boolean,
		},

		PayBackTime: {
			type: String,
		},

		interest: {
			type: Number,
		},
		title: {
			type: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("saveLocks", SaveLockSchema);
