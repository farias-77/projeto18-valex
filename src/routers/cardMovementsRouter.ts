import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import { postRecharge } from "../controllers/cardMovementsController";
import * as schemas from "../schemas/systemSchemas";

const cardMovementsRouter = Router();

cardMovementsRouter.post("/recharge/:cardId", schemaValidation(schemas.rechargeSchema), postRecharge);

export default cardMovementsRouter;