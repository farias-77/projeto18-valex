import { Request, Response } from "express";
import { validateCardType, validateEmployeeCompanyRelation, validateEmployeeCardTypeRelation, generateCard } from "../services/cardServices";

export async function createCard(req: Request, res: Response){
    const cardType = req.body.cardType;
    const employeeId = Number(req.body.employeeId);
    const apiKey = req.headers.apikey;
    
    //validateCardType(cardType);
    //validateEmployeeCompanyRelation(employeeId, apiKey);
    //validateEmployeeCardTypeRelation(employeeId, cardType);
    //generateCard(employeeId, cardType)

    return res.status(200).send("Cartão registrado.");
}