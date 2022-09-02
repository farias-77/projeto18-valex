import { Request, Response } from "express";
import * as cardServices from "../services/cardServices";

export async function createCard(req: Request, res: Response){
    const cardType = req.body.cardType;
    const employeeId = Number(req.body.employeeId);
    const apiKey: any = req.headers.apikey;
    
    //cardServices.validateCardType(cardType);
    //cardServices.validateEmployee(employeeId);
    //cardServices.validateCompany(apiKey);
    //cardServices.validateEmployeeCompanyRelation(employeeId, apikey);
    //cardServices.validateEmployeeCardTypeRelation(employeeId, cardType);
    //cardServices.generateCard(employeeId, cardType)

    return res.status(200).send("Cartão registrado.");
}

export async function activateCard(req: Request, res: Response){
    const cardId: number = Number(req.params.cardId);
    const cvc: string = req.body.cvc;
    const password: string = req.body.password;

    //cardServices.validateRegisteredCard(cardId);
    //cardServices.validateExpirationDate(cardId);
    //cardServices.validateActivated(cardId);
    //cardServices.validateCvc(cardId, cvc);
    //cardServices.insertPassword(cardId, password);

    return res.status(200).send("Cartão ativado.");
}