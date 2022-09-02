import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	if (error.code === "teste") return res.status(422).send("CAIU NO HANDLER SIIIIU");

	return res.sendStatus(500);
}