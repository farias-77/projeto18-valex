import joi from "joi";

export const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().required()
});

export const activateCardSchema = joi.object({
    cardId: joi.number().required(),
    cvc: joi.string().required(),
    password: joi.string().length(4)
});
