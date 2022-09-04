import { createCard, activateCard, checkCardBalance, blockCard, unlockCard } from "../controllers/cardController";
import { schemaValidation } from "../middlewares/schemaValidation";
import * as schemas from "../schemas/systemSchemas";
import { Router } from "express";

const cardRouter = Router();

cardRouter.put("/activate-card/:cardId", schemaValidation(schemas.activateCardSchema), activateCard);
cardRouter.put("/unlock-card/:cardId", schemaValidation(schemas.passwordSchema), unlockCard);
cardRouter.put("/block-card/:cardId", schemaValidation(schemas.passwordSchema), blockCard);
cardRouter.post("/create-card", schemaValidation(schemas.createCardSchema), createCard);
cardRouter.get("/card-balance/:cardId", checkCardBalance);

export default cardRouter;
