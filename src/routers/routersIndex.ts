import cardMovementsRouter from "./cardMovementsRouter";
import cardRouter from "./cardRouter";
import { Router } from "express";

const router = Router();

router.use(cardMovementsRouter);
router.use(cardRouter);

export default router;