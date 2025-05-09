import express from 'express';
import morgan from 'morgan';
import router from './router';
import { protect, signup, singin } from './modules/auth';
import { body } from 'express-validator';
import { validate, errorHandler } from './modules/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/signup', [
  body('name').exists().withMessage('Name is required').notEmpty().withMessage('Name cannot be empty'),
  body('email').exists().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
  body('password').exists().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
], signup);
app.post('/signin', [
  body('email').exists().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
  body('password').exists().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
], singin);
app.use('/api', protect, router);

app.use(errorHandler);

export default app;