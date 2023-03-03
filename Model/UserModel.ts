import mongoose from "mongoose";
import { UserData } from "../AllInterfaces/AllInterface";

interface MainData extends UserData, mongoose.Document {}

const UserSchema = new mongoose.Schema<UserData>(
	{
		name: {
			type: String,
			required: true,
		},

		userName: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},

		phoneNumber: {
			type: Number,
			required: true,
		},

		password: {
			type: String,
		},
		accountNumber: {
			type: Number,
		},

		verified: {
			type: Boolean,
		},

		isAdmin: {
			type: Boolean,
		},
		wallet: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "wallets",
			},
		],

		history: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "histories",
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<MainData>("users", UserSchema);
