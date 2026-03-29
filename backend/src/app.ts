import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import toolRoutes from './routes/toolRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);

app.use(errorHandler);

export default app;