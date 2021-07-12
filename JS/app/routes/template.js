import express from "express";

import { getManyTemplate, getOneTemplate, postTemplate, putTemplate, deleteTemplate } from "../controllers/template";

const route = express.Router();

route.get("/", getManyTemplate);
route.get("/:id", getOneTemplate);
route.post("/", postTemplate);
route.put("/:id", putTemplate);
route.delete("/:id", deleteTemplate);

export default route;
