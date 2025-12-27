import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

export const validateId = (schema: Joi.Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (e) {
      if (e instanceof Joi.ValidationError) {
        return next(createHttpError(400, 'Invalid ID parameters'));
      }
      next(e);
    }
  };
};
