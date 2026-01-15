import type { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev)
    console.error(`Last middleware error: "${err.name}": ${err.message}`);

  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    res.status(400).json({
      message:
        'Invalid JSON format. Please check your syntax (quotes, commas, etc.)',
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  if (err.name === 'CastError') {
    res.status(404).json({
      message: `Resource not found (invalid ID)`,
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: `Error: ${err.message}`,
    });
    return;
  }

  res.status(500).json({
    message: isDev
      ? `Error: ${err.message}`
      : 'Something went wrong. Please try again later',
  });
};
