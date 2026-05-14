import cookieParser from "cookie-parser"
import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
import router from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from "./middleware/globalErrorHandler.js";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
  ],
  credentials: true,
}));
app.use(cookieParser())

// Application routes
app.use('/api/v1', router);

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Not found route
app.use(errorHandler);
app.use(notFound);

export default app;