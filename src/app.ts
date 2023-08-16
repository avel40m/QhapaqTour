import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'
import usuarioRoutes from './routes/usuario.router';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// jwt
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use('/api/v1', usuarioRoutes);

app.use("/api",usuarioRoutes);

export default app;