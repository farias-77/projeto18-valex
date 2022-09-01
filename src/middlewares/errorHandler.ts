import { Request, Response, NextFunction } from "express";
import "express-async-errors";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {

	if (error.code === "InvalidCardType") return res.status(422).send(error.message);
	if (error.type === "error_...") return res.sendStatus(500);
	if (error.type === "error_...") return res.sendStatus(500);

	return res.status(500).send("caiu no handler");
}