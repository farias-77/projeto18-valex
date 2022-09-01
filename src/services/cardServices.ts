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

export async function validateEmployeeCompanyRelation(employeeId: number, apiKey: string){
    const employee = await employeeRepositories.findById(employeeId);
    const company = await companyRepositories.findByApiKey(apiKey);

    if(employee.companyId !== company.id){
        throw {code: "InvalidCompanyForEmployee", message: "Um funcionário só pode receber um cartão da sua própria empresa!"};
    }

    return;
}

export async function validateEmployeeCardTypeRelation(employeeId: number, cardType: any){
    const card = await cardRepositories.findByTypeAndEmployeeId(cardType, employeeId);

    if(card){
        throw {code: "EmployeeAlreadyHasThisType", message: "Um funcionário só pode receber um cartão de cada tipo!"};
    }
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
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: cardType
    }

    await cardRepositories.insert(cardData);
    return;
}