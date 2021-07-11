import { Request, Response } from "express";
import templateModel from "../models/template";
import { template } from "../types/template";

// GET /template # get all template
export const getManyTemplate = async (req: Request, res: Response): Promise<void> => {
	try {
		const template = (await templateModel.find()) as template[];
		res.status(200).json(template);
		// 200 - OK
	} catch (err) {
		console.warn(err.message);
		res.status(404).json({ message: err.message });
		// 404 - not found
	}
};

// GET /template/:id # get single template
export const getOneTemplate = async (req: Request, res: Response): Promise<void> => {
	try {
		const exists = await templateModel.exists({ _id: req.params.id });
		if (!exists) {
			res.status(404).send({ message: `No template with _id: ${req.params.id}` });
			// 404 - not found
		} else {
			const template = (await templateModel.findById(req.params.id)) as template;
			res.status(200).json(template);
			// 200 - OK
		}
	} catch (err) {
		console.warn(err.message);
		res.status(500).json({ message: err.message });
		// 500 - internal server error
	}
};

// POST /template # creates a new template
export const postTemplate = async (req: Request, res: Response): Promise<void> => {
	const template = new templateModel(req.body);
	try {
		await template.save();
		res.status(201).json(template);
		// 201 - created
	} catch (err) {
		console.warn(err.message);
		res.status(409).json({ message: err.message });
		// 409 - conflict
	}
};

// PUT /template/:id # modifies a template by id
export const putTemplate = async (req: Request, res: Response): Promise<void> => {
	try {
		const exists = await templateModel.exists({ _id: req.params.id });
		if (!exists) {
			res.status(404).send({ message: `No template with _id: ${req.params.id}` });
			// 404 - not found
		} else {
			await templateModel.findByIdAndUpdate(req.params.id, { ...req.body });
			res.status(204).send();
			// 204 - Success, no content
		}
	} catch (err) {
		console.warn(err.message);
		res.status(500).json({ message: err.message });
		// 500 - internal server error
	}
};

// DELETE /template/:id # deletes a template
export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
	try {
		const exists = await templateModel.exists({ _id: req.params.id });
		if (!exists) {
			res.status(404).send({ message: `No template with _id: ${req.params.id}` });
			// 404 - not found
		} else {
			await templateModel.deleteOne({ _id: req.params.id });
			res.status(204).send();
			// 204 - Success, no content
		}
	} catch (err) {
		console.warn(err.message);
		res.status(500).json({ message: err.message });
		// 500 - internal server error
	}
};
