import * as documentController from "../controller/documentController.js";
import express from "express";
import { validateToken } from "../middlewares/validateToken.js";

const Router = express.Router();

Router.post("/create-template", validateToken, documentController.create);
Router.get("/get-templates", validateToken, documentController.getAll)

export default Router;
