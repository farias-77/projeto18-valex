import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import { postRecharge, postPayment } from "../controllers/cardMovementsController";
import * as schemas from "../schemas/systemSchemas";

const cardMovementsRouter = Router();

cardMovementsRouter.post("/recharge/:cardId", schemaValidation(schemas.rechargeSchema), postRecharge);
cardMovementsRouter.post("/payment/:cardId", schemaValidation(schemas.paymentSchema), postPayment);

export default cardMovementsRouter;