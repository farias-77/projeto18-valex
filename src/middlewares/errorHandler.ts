import { Request, Response, NextFunction } from "express";

export default function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
	if (error.type === "error_...") return res.sendStatus(500);
	if (error.type === "error_...") return res.sendStatus(500);
	if (error.type === "error_...") return res.sendStatus(500);

	return res.sendStatus(500);
}