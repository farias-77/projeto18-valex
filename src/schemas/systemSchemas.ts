import joi from "joi";

export const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().required()
});

export const activateCardSchema = joi.object({
    cvc: joi.string().required(),
    password: joi.string().length(4).required()
});

export const passwordSchema = joi.object({
    password: joi.string().required()
});

export const rechargeSchema = joi.object({
    amount: joi.number().greater(0).required()
});

export const paymentSchema = joi.object({
    amount: joi.number().greater(0).required(),
    password: joi.string().required(),
    businessId: joi.number().required()
});
