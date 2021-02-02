const joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).required().email(),
        password: joi.string().min(6).required()
    })
    return schema.validate(data);
}
const registerValidation = (data) => {
    const schema = joi.object({
        fullname: joi.string().min(6).required(),
        username: joi.string().min(5).required().email(),
        password: joi.string().min(6).required(),
        role: joi.string().min(3).required()

    })
    return schema.validate(data);
}

module.exports = { loginValidation, registerValidation };