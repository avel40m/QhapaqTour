import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/usuario.routes'

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use("/api",userRoutes);

export default app;