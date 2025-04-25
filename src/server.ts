import express from 'express';
import morgan from 'morgan';
import router from './router';
import { protect } from './modules/auth';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api', protect, router);

export default app;