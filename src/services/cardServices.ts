import * as employeeRepositories from "../repositories/employeeRepository";
import * as companyRepositories from "../repositories/companyRepository";
import * as cardRepositories from "../repositories/cardRepository";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import Cryptr from "cryptr";

export async function validateCardType(cardType: string){
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
    
    const cardholderName: string = returnCardName(employee.fullName);
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

function returnCardName(fullName: string): string{
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
