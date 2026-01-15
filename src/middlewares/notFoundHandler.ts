import type { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route ${req.url} with method ${req.method} not found`,
  });

  console.warn(
    'Last middleware: No valid routes found. Check the request url or method',
  );
};
