import mongoose from "mongoose";
import { template } from "../types/template";

export default mongoose.model(
	"template",
	new mongoose.Schema<template>(
		{
			foo: { type: String, required: true },
			bar: { type: Number, default: 0 },
		},
		{ timestamps: true },
	),
);
