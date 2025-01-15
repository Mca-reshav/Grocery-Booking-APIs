import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "joi";
import { log } from "../services/response.service";

const validateRequest = (schema: Joi.ObjectSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error, value } = schema.validate(
        { ...req.body, ...req.params, ...req.query },
        { abortEarly: false, stripUnknown: true }
      );

      if (error) {
        const messages = error.details.map(detail => detail.message.replace(/\"/g, ""));
        res.status(400).json(log(false, messages.join(", ")));
        return;
      }

      (req as any).validatedData = value;
      next();
    } catch (err) {
      res.status(500).json(log(false, "Internal server error"));
    }
  };
};

export default validateRequest;
