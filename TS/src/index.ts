// If you've just downloaded this repo, be sure to run `npm i` to install necessary dependencies
// Take a look in package.json scripts, you'll see you can run `npm test` to run nodemon without compiling - magical!
// Also have a look around the files to see what's set up for you
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as routes from "./routes/";

const app = express();
const MONGOURL = "mongodb://0.0.0.0:27017/local";
const PORT = 5000;
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/template", routes.template);

app.get("*", (req: Request, res: Response) => {
	res.status(404).send("This page or resource doesn't exist.");
});
app.use(cors());
mongoose
	.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
