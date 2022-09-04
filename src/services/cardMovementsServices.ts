import * as rechargeRepositories from "../repositories/rechargeRepository";
import * as employeeRepositories from "../repositories/employeeRepository";
import * as businessRepositories from "../repositories/businessRepository";
import * as companyRepositories from "../repositories/companyRepository";
import * as PaymentRepositories from "../repositories/paymentRepository";
import * as cardRepositories from "../repositories/cardRepository";

import * as cardServices from "./cardServices";

export async function computeRecharge(cardId: number, amount: number){
    const rechargeAmount: any = {cardId, amount};
    
    await rechargeRepositories.insert(rechargeAmount);
    return;
}

export async function validateCompanyCardRelation(apiKey: any, cardId: number){
    const card = await cardRepositories.findById(cardId);
    const employee = await employeeRepositories.findById(card.employeeId);
    const company = await companyRepositories.findByApiKey(apiKey);
    
    if(employee.companyId !== company.id){
        throw {code: "InvalidCardCompanyRelation", message: "Uma empresa só pode recarregar os cartões dos próprios funcionários!"};
    }

    return;
}

export async function validateBusiness(businessId: number, cardId: number){
    const business = await businessRepositories.findById(businessId);
    const card = await cardRepositories.findById(cardId);

    if(!business){
        throw {code: "InvalidBusiness", message: "Não encontramos um estabelecimento com o id informado."};
    }

    if(card.type !== business.type){
        throw {code: "InvalidBusiness", message: `Esse cartão só pode ser utilizado em estabelecimentos do tipo "${card.type}".`};
    }

    return;
}

export async function validatePaymentAmount(cardId: number, amount: number){
    const cardBalance = await cardServices.returnCardBalance(cardId);

    if(cardBalance.balance < amount){
        throw {code: "NoFund", message: "Você não possui saldo suficiente para essa compra!"};
    }

    return;
}

export async function computePayment(cardId: number, amount: number, businessId: number){
    const paymentData: any = {cardId, amount, businessId};
    
    await PaymentRepositories.insert(paymentData);
    return;
}