import { Request, Response } from "express";
import { validateCardType, validateEmployeeCompanyRelation, validateEmployeeCardTypeRelation, generateCard, validateEmployee, validateCompany } from "../services/cardServices";

export async function createCard(req: Request, res: Response){

    const cardType = req.body.cardType;
    const employeeId = Number(req.body.employeeId);
    const apikey: any = req.headers.apikey;
    
    validateCardType(cardType);
    //validateEmployee(employeeId);
    //validateCompany(apiKey);
    //validateEmployeeCompanyRelation(employeeId, apikey);
    //validateEmployeeCardTypeRelation(employeeId, cardType);
    //generateCard(employeeId, cardType)

    return res.status(200).send("Cartão registrado.");
}