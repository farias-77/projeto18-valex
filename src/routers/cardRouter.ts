import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation";
import * as schemas from "../schemas/systemSchemas";

const cardRouter = Router();

cardRouter.post("/create-card", schemaValidation(schemas.createCardSchema))
cardRouter.post("/create-card", (req, res) => {
    res.send("end");
})

export default cardRouter;
