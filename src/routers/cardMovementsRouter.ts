import { postRecharge, postPayment } from "../controllers/cardMovementsController";
import { schemaValidation } from "../middlewares/schemaValidation";
import * as schemas from "../schemas/systemSchemas";
import { Router } from "express";

const cardMovementsRouter = Router();

cardMovementsRouter.post("/recharge/:cardId", schemaValidation(schemas.rechargeSchema), postRecharge);
cardMovementsRouter.post("/payment/:cardId", schemaValidation(schemas.paymentSchema), postPayment);

export default cardMovementsRouter;