import mongoose from "mongoose";

export default mongoose.model(
	"template",
	new mongoose.Schema(
		{
			foo: { type: String, required: true },
			bar: { type: Number, default: 0 },
		},
		{ timestamps: true },
	),
);
