import express from "express";
import monogose from "mongoose";
import cors from "cors";
import UserRoute from "./Routes/UserRoutes";
const port: number = 6400;
const url = "mongodb://localhost/PaymentPiggyVestDB";

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

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
