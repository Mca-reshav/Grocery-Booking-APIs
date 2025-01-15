import Joi from 'joi';

export default {
    register: Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        contact: Joi.string().length(10).required(),
        password: Joi.string().min(3).max(20).required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(20).required(),
    })
}