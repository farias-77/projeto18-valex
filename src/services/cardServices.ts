import * as employeeRepositories from "../repositories/employeeRepository";
import * as rechargeRepositories from "../repositories/rechargeRepository";
import * as companyRepositories from "../repositories/companyRepository";
import * as paymentRepositories from "../repositories/paymentRepository";
import * as cardRepositories from "../repositories/cardRepository";

import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";


export function validateCardType(cardType: string){
    const types: string[] = [
        "groceries",
        "restaurant",
        "transport",
        "education",
        "health"
    ]

    if(types.filter(type => type === cardType).length === 0){
        throw {code: "InvalidCardType", message: "Por favor, informe um cardType válido."};
    }

    return;
}

export async function validateEmployee(employeeId: number){
    const employee = await returnEmployeeById(employeeId);
    
    if(!employee){
        throw {code: "InvalidEmployeeId", message: "Não existe um funcionário com esse Id!"};
    }

    return;
}

export async function validateCompany(apiKey: string){
    const company = await returnCompanyByApiKey(apiKey);

    if(!company){
        throw {code: "InvalidApiKey", message: "ApiKey inválida!"};
    }

    return;
}

export async function validateEmployeeCompanyRelation(employeeId: number, apiKey: string){
    const employee = await returnEmployeeById(employeeId);
    const company = await returnCompanyByApiKey(apiKey);
    
    if(employee.companyId !== company.id){
        throw {code: "InvalidCompanyEmployeeRelation", message: "Um funcionário só pode receber um cartão da sua própria empresa!"};
    }

    return;
}

export async function validateEmployeeCardTypeRelation(employeeId: number, cardType: any){
    const card = await returnCardByTypeAndEmployeeId(employeeId, cardType);

    if(card){
        throw {code: "EmployeeAlreadyHasThisType", message: "Um funcionário só pode receber um cartão de cada tipo!"};
    }

    return;
}

export async function generateCard(employeeId: number, cardType: any){
    const cryptr = new Cryptr('secret');

    const employee: any = await employeeRepositories.findById(employeeId);
    
    const cardholderName: string = returnCardHolderName(employee.fullName);
    const expirationDate: string = returnExpirationDate().toString();
    const cardNumber: string = faker.finance.creditCardNumber();
    const cvc: string = faker.finance.creditCardCVV();
    const encryptedCvc = cryptr.encrypt(cvc);

    const cardData = {
        employeeId,
        number: cardNumber,
        cardholderName,
        securityCode: encryptedCvc,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type: cardType
    }

    await cardRepositories.insert(cardData);
    return;
}

export async function validateRegisteredCard(cardId: number){
    const card = await returnCardById(cardId);

    if(!card){
        throw {code: "InvalidCardId", message: "Não encontramos nenhum cartão com o id informado!"};
    }

    return;
}

export async function validateExpirationDate(cardId: number){
    const card = await returnCardById(cardId);
    const today = dayjs(new Date()).format("MM/YY");

    if(today > card.expirationDate){
        throw {code: "ExpiredCard", message: "Cartão expirado!"};
    }

    return;
}

export async function validateActivatedCard(cardId: number, route: string){
    const card = await returnCardById(cardId);

    if(card.password && route === "activateCard"){
        throw {code: "ActivatedCard", message: "Você não pode ativar um cartão que já está ativado!"};
    }

    if(!card.password && route === "blockCard"){
        throw {code: "ActivatedCard", message: "Você não pode bloquear um cartão que não está ativado!"};
    }

    if(!card.password && route === "rechargeCard"){
        throw {code: "ActivatedCard", message: "Você não pode recarregar um cartão que não está ativado!"};
    }

    return;
}   

export async function validateCvc(cardId: number, cvc: string){
    const cryptr = new Cryptr('secret');
    
    const card = await returnCardById(cardId);
    const decryptedCvc = cryptr.decrypt(card.securityCode);

    if(cvc !== decryptedCvc){
        throw {code: "InvalidCvc", message: "CVC inválido."};
    }

    return;
}

export async function insertPassword(cardId: number, password: string){
    const numericPassword: number = Number(password);

    if(isNaN(numericPassword)){
        throw {code: "NanPassword", message: "A senha deve ser composta por 4 números!"};
    }

    const card = await returnCardById(cardId);
    
    const cryptr = new Cryptr('secret');
    const encryptedPassword = cryptr.encrypt(numericPassword.toString());

    const cardData = {
        ...card,
        password: encryptedPassword,
    }

    await updateCard(cardId, cardData);
    return;
}

export async function returnCardBalance(cardId: number){
    const cardPayments = await returnCardPayments(cardId);
    const cardRecharges = await returnCardRecharges(cardId);
    
    const balance = calculateBalance(cardRecharges, cardPayments);
    return {
        balance,
        transactions: cardPayments,
        recharges: cardRecharges
    }
}

export async function validateBlockedCard(cardId: number, isBlockRoute: boolean){
    const card = await returnCardById(cardId);

    if(card.isBlocked && isBlockRoute){
        throw {code: "BlockedCard", message: "Você não pode bloquear um cartão que já está bloqueado!"};
    }

    if(!card.isBlocked && !isBlockRoute){
        throw {code: "NonBlockedCard", message: "Você não pode desbloquear um cartão que não está bloqueado!"};
    }

    return;
}

export async function validateCardPassword(cardId: number, passwordSent: string){
    const cryptr = new Cryptr('secret');
    
    const card = await returnCardById(cardId);
    const decryptedPassword:string = cryptr.decrypt(card.password || "");

    if(passwordSent !== decryptedPassword){
        throw {code: "IncorrectPassword", message: "Senha incorreta."};
    }

    return;
}

export async function changeBlockedStatus(cardId: number, blockStatus: boolean){
    const card = await returnCardById(cardId);

    const cardData = {
        ...card,
        isBlocked: blockStatus
    };

    await updateCard(cardId, cardData);
    return;
}

function returnCardHolderName(fullName: string): string{
    const employeeNameArray = fullName.split(" ");
    const cardNameArray = employeeNameArray.map( (name, index) => {
        if(index === 0 || index === employeeNameArray.length-1){
            return name;
        }

       if(name.length >= 3){
           return name[0];
       }

       return false;
    });

    const cardName = cardNameArray.filter(name => name).join(" ").toUpperCase();
    return cardName;
}

function returnExpirationDate(){
    const now = new Date();
    const FiveYAhead = new Date().setFullYear(now.getFullYear() + 5);

    return dayjs(FiveYAhead).format('MM/YY');
}

async function returnEmployeeById(employeeId: number){
    return await employeeRepositories.findById(employeeId);
}

async function returnCompanyByApiKey(apiKey: string){
    return await companyRepositories.findByApiKey(apiKey);
}

async function returnCardByTypeAndEmployeeId(employeeId: number, cardType: any){
    return await cardRepositories.findByTypeAndEmployeeId(cardType, employeeId);
}

async function returnCardById(cardId: number){
    return await cardRepositories.findById(cardId);
}

async function returnCardPayments(cardId: number){
    return await paymentRepositories.findByCardId(cardId);
}

async function returnCardRecharges(cardId: number){
    return await rechargeRepositories.findByCardId(cardId);
}

function calculateBalance(recharges: any, payments: any){
    let balance = 0;

    recharges.forEach((recharge: any) => balance += recharge.amount);
    payments.forEach((payment: any) => balance -= payment.amount);

    return balance;
}

async function updateCard(cardId: number, cardData: any){
    return await cardRepositories.update(cardId, cardData);
}