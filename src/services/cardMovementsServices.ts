import * as rechargeRepositories from "../repositories/rechargeRepository";
import * as cardRepositories from "../repositories/cardRepository";
import * as employeeRepositories from "../repositories/employeeRepository";
import * as companyRepositories from "../repositories/companyRepository";

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