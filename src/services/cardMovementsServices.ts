import * as rechargeRepositories from "../repositories/rechargeRepository";

export async function computeRecharge(cardId: number, amount: number){
    const rechargeAmount: any = {cardId, amount};
    
    await rechargeRepositories.insert(rechargeAmount);
    return;
}