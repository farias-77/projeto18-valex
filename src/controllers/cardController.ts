import { Request, Response, NextFunction } from "express";
import * as cardServices from "../services/cardServices";

export async function createCard(req: Request, res: Response, next: NextFunction){
    try{
        const cardType = req.body.cardType;
        const employeeId = Number(req.body.employeeId);
        const apiKey: any = req.headers.apikey;
        
        cardServices.validateCardType(cardType);
        await cardServices.validateEmployee(employeeId);
        await cardServices.validateCompany(apiKey);
        await cardServices.validateEmployeeCompanyRelation(employeeId, apiKey);
        await cardServices.validateEmployeeCardTypeRelation(employeeId, cardType);
        await cardServices.generateCard(employeeId, cardType)

        return res.status(200).send("Cartão registrado.");
    }catch(error){
        next(error);
    }
}

export async function activateCard(req: Request, res: Response, next: NextFunction){
    try{
        const cardId: number = Number(req.params.cardId);
        const cvc: string = req.body.cvc;
        const password: string = req.body.password;

        //cardServices.validateRegisteredCard(cardId);
        //cardServices.validateExpirationDate(cardId);
        //cardServices.validateActivated(cardId);
        //cardServices.validateCvc(cardId, cvc);
        //cardServices.insertPassword(cardId, password);

        return res.status(200).send("Cartão ativado.");
    }catch(error){
        next(error);
    }
}

export async function checkCardBalance(req : Request, res: Response){
    const cardId: number = Number(req.params.cardId);

    //const cardBalance = await cardServices.returnCardBalance(cardId);

    //return cardBalance;
}