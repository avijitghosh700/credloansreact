// Entry point for backend (Express)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rootRouter from './routes/root';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/', rootRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
