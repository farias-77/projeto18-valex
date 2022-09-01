import cardRouter from "./cardRouter";
import { Router } from "express";

const router = Router();

router.use(cardRouter);

export default router;