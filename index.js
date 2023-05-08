
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from "cors"
const app = express();
import connectDb from "./dbconnection.js";
connectDb()
app.use(bodyParser.json())
dotenv.config()

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
const port = 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
