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