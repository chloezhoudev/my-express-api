import express from 'express';
import morgan from 'morgan';
import router from './router';
import { protect, signup, singin } from './modules/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/signup', signup);
app.post('/signin', singin);
app.use('/api', protect, router);

export default app;