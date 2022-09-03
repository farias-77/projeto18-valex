import cardRouter from "./cardRouter";
import { Router } from "express";
import cardMovementsRouter from "./cardMovementsRouter";

const router = Router();

router.use(cardRouter);
router.use(cardMovementsRouter);

export default router;