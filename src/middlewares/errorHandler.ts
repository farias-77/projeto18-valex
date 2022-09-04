import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	
	if (error.code === "NoFunds") return res.status(401).send(error.message);	

	if (error.code === "InvalidCvc") return res.status(400).send(error.message);

	if (error.code === "NanPassword") return res.status(406).send(error.message);

	if (error.code === "ExpiredCard") return res.status(401).send(error.message);
	
	if (error.code === "BlockedCard") return res.status(401).send(error.message);
	
	if (error.code === "InvalidCardId") return res.status(404).send(error.message);

	if (error.code === "InvalidApiKey") return res.status(404).send(error.message);

	if (error.code === "ActivatedCard") return res.status(401).send(error.message);

	if (error.code === "NonBlockedCard") return res.status(401).send(error.message);
	
	if (error.code === "InvalidCardType") return res.status(400).send(error.message);

	if (error.code === "InvalidBusiness") return res.status(404).send(error.message);

	if (error.code === "IncorrectPassword") return res.status(401).send(error.message);
	
	if (error.code === "InvalidEmployeeId") return res.status(404).send(error.message);

	if (error.code === "InvalidCardCompanyRelation") return res.status(401).send(error.message);

	if (error.code === "EmployeeAlreadyHasThisType") return res.status(401).send(error.message);

	if (error.code === "InvalidCompanyEmployeeRelation") return res.status(401).send(error.message);
	

	return res.sendStatus(500);
}