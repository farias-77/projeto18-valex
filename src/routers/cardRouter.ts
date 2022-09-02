import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import { createCard, activateCard, checkCardBalance } from "../controllers/cardController";
import * as schemas from "../schemas/systemSchemas";

const cardRouter = Router();

cardRouter.post("/create-card", schemaValidation(schemas.createCardSchema), createCard);
cardRouter.post("/activate-card/:cardId", schemaValidation(schemas.activateCardSchema), activateCard);
cardRouter.get("/card-balance/:cardId", checkCardBalance);

export default cardRouter;
