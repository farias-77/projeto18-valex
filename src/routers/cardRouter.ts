import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import { createCard } from "../controllers/cardController";
import * as schemas from "../schemas/systemSchemas";

const cardRouter = Router();

cardRouter.post("/create-card", schemaValidation(schemas.createCardSchema), createCard);

export default cardRouter;
