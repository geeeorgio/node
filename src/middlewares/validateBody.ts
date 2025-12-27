import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

export const validateBody = (schema: Joi.Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        convert: true,
        stripUnknown: true,
      });
      next();
    } catch (e) {
      if (e instanceof Joi.ValidationError) {
        const message = e.details.map((d) => d.message).join(', ');
        return next(createHttpError(400, message));
      }

      if (e instanceof Error) {
        return next(createHttpError(500, e.message));
      }

      next(createHttpError(500, 'Unexpected validation error'));
    }
  };
};
