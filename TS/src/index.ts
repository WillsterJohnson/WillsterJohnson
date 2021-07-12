// If you've just downloaded this repo, be sure to run `npm i` to install necessary dependencies
// Take a look in package.json scripts, you'll see you can run `npm test` to run nodemon without compiling - magical
// Also have a look around the files to see what's set up for you
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import * as routes from "./routes/";

const app = express();
const MONGOURL = "mongodb://0.0.0.0:27017/local";
const PORT = 5000;
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

// customize your 404 webpage here
const defaultErr = (req: Request, res: Response) => {
	res.status(404).send("This page or resource doesn't exist.");
};
// alternatively, you can annoy your frontend dev with this
/*
	const defaultErr = (req: Request, res: Response) => {
		res.status(418).send(
			`<div style="width: 80vw; height: 80vh; margin: 10vh 10vw;"><img alt="${
				req.body.errMsg ? req.body.errMsg : `Could not ${req.method} ${req.path}`
			}" src="assets/418.gif" style="width: 100%; max-height: 100%"></div>`,
		);
	};
*/

// access to assets if needed
// this doesn't require a route as the only acceptable request here is GET
/*
	app.get("/assets/*", (req: Request, res: Response) => {
		try {
			res.status(200).sendFile(path.normalize(`/${__dirname}/${req.path}`));
		} catch (err) {
			req.body.errMsg = err.message;
			defaultErr(req, res);
		}
	});
*/

// use your routes here
app.use("/template", routes.template);

// no routes beyond this point
app.get("*", defaultErr);

// allows using independent frontend
// be sure to set your proxy if you use this
app.use(cors());

// connect to mongoDB and go live
mongoose
	.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, autoCreate: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
