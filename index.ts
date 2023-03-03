import express from "express";
import monogose from "mongoose";
import cors from "cors";
import UserRoute from "./Routes/UserRoutes";
import QuickRoute from "./Routes/QuickSaveRoute";
const port: number = 6400;
import InvestRoute from "./Routes/InvestmentRoute";
const url = "mongodb://0.0.0.0:27017/PaymentPiggyVestDB";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).json({
		message: "api is ready for consumption",
	});
});

monogose.connect(url).then(() => {
	console.log(`database is connected`);
});

app.use("/api/user", UserRoute);
app.use("/api/quick", QuickRoute);
app.use("/api/investment", InvestRoute);

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
