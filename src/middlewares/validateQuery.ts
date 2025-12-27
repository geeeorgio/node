import type { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';

export const validateQuery = <T>(schema: Joi.Schema) => {
  return async (
    req: Request<object, object, object, T>,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      await schema.validateAsync(req.query, {
        abortEarly: false,
        convert: true,
        stripUnknown: true,
      });

      next();
    } catch (e) {
      if (e instanceof Joi.ValidationError) {
        return next(
          createHttpError(400, `Invalid query parameters: ${e.message}`),
        );
      }
      next(e);
    }
  };
};
