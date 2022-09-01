import joi from "joi";

export const createCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().required()
});
