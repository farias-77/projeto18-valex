import { Request, Response, NextFunction } from "express";
import * as cardServices from "../services/cardServices";


export async function createCard(req: Request, res: Response, next: NextFunction){
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
}

export async function activateCard(req: Request, res: Response, next: NextFunction){
        const cardId: number = Number(req.params.cardId);
        const cvc: string = req.body.cvc;
        const password: string = req.body.password;
        
        await cardServices.validateRegisteredCard(cardId);
        await cardServices.validateExpirationDate(cardId);
        await cardServices.validateActivated(cardId);
        await cardServices.validateCvc(cardId, cvc);
        await cardServices.insertPassword(cardId, password);

        return res.status(200).send("Cartão ativado.");
}

export async function checkCardBalance(req : Request, res: Response){
    const cardId: number = Number(req.params.cardId);

    await cardServices.validateRegisteredCard(cardId);
    const cardBalance = await cardServices.returnCardBalance(cardId);

    return res.status(200).send(cardBalance);
}

// export async function blockCard(req, res)