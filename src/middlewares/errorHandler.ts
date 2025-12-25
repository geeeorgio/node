import type { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) console.error('Error details:', err.message);

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
      ? `Internal Server Error: ${err.message}`
      : 'Something went wrong. Please try again later',
  });
};
