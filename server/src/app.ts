import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
import router from './routes/index.js';
import { notFound } from './middleware/notFound.js';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Not found route
app.use(notFound);

export default app;