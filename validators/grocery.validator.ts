import Joi from 'joi';

export default {
    add: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().precision(2).positive().required(),
        inventoryLevel: Joi.number().integer().min(0).required(),      
        categoryId: Joi.string().length(1).required(),
        type: Joi.number().precision(2).required(),
        groceryType: Joi.string().length(1).required(),
        subName: Joi.string().max(50).required(),
    }),
    update: Joi.object({
        groceryId: Joi.string().required(),
        name: Joi.string().min(3).max(50).optional(),
        price: Joi.number().precision(2).positive().optional(),
        inventoryLevel: Joi.number().integer().min(0).optional(),      
        categoryId: Joi.string().length(1).optional(),
        type: Joi.number().precision(2).optional(),
        groceryType: Joi.string().length(1).optional(),
        subName: Joi.string().max(50).optional(),
    }),
    placeOrder: Joi.object({
        items: Joi.array().items(
            Joi.object({
              groceryId: Joi.string().required(),
              quantity: Joi.number().min(1).required(),
            })
          ).min(1).required(),
      }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(20).required(),
    })
}