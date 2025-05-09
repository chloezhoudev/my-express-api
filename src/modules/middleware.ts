import { validationResult } from "express-validator";

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Handle different types of errors
  if (err.type === 'auth') {
    return res.status(401).json({ error: err.message });
  }

  if (err.type === 'input') {
    return res.status(400).json({ error: err.message });
  }

  // Default error message
  res.status(500).json({
    error: 'Something went wrong!'
  });
};

export const createError = (message: string, type = 'server') => {
  const error = new Error(message);
  (error as any).type = type;
  return error;
};