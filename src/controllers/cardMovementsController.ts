import { Request, Response, NextFunction } from "express";
import * as cardServices from "../services/cardServices";
import * as cardMovementsServices from "../services/cardMovementsServices";

export async function postRecharge(req: Request, res: Response){
    const cardId: number = Number(req.params.cardId);
    const amount: number = Number(req.body.amount);
    const apiKey: any = req.headers.apikey;

    await cardServices.validateCompany(apiKey);
    await cardServices.validateRegisteredCard(cardId);
    await cardMovementsServices.validateCompanyCardRelation(apiKey, cardId);
    await cardServices.validateActivatedCard(cardId, "rechargeCard");
    await cardServices.validateExpirationDate(cardId);
    await cardMovementsServices.computeRecharge(cardId, amount);

    return res.status(200).send(`Recarga de ${amount} reais concluída com sucesso.`);
}

export async function postPayment(req: Request, res: Response){
    const cardId: number = Number(req.params.cardId);
    const amount: number = Number(req.body.amount);
    const businessId: number = Number(req.body.businessId);
    const password: string = req.body.password;

    await cardServices.validateRegisteredCard(cardId);
    await cardServices.validateActivatedCard(cardId, "paymentCard");
    await cardServices.validateExpirationDate(cardId);
    await cardServices.validateBlockedCard(cardId, "postPayment");
    await cardServices.validateCardPassword(cardId, password);
    await cardMovementsServices.validateBusiness(businessId, cardId);
    await cardMovementsServices.validatePaymentAmount(cardId, amount);
    await cardMovementsServices.computePayment(cardId, amount, businessId);
    
    return res.send(`Compra de ${amount} reais concluída com sucesso.`);
}