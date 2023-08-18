import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import passportMiddleware from './middlewares/passport'
import usuarioRoutes from './routes/usuario.router';
import comentarioRoutes from './routes/calificacion.router';
import recorridoRoutes from './routes/recorrido.router';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// jwt
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use("/api/v1",usuarioRoutes);
app.use("/api/v1",comentarioRoutes);
app.use("/api/v1",recorridoRoutes);

export default app;