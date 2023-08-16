import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
<<<<<<< HEAD
import userRoutes from './routes/usuario.routes'
=======
import passport from 'passport';
import passportMiddleware from './middlewares/passport'
import usuarioRoutes from './routes/usuario.router';
>>>>>>> cece4c7b370d464c5429e1d968a4fe0e9892f55b

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

app.use("/api",userRoutes);

export default app;