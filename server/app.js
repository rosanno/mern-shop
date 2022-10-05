import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './src/routes/index.js';
import connectDB from './src/config/dbconnection.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
