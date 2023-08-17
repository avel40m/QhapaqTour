import { Router } from 'express';
import { 
   deleteUsuario, 
   getUsuario, 
   getUsuarios, 
   refresh, 
   signIn, 
   signUp, 
   updateUsuario
} from '../controllers/usuario.controller';
import passport from 'passport';

const router = Router();

router.get('/usuarios', passport.authenticate('jwt', { session: false }), getUsuarios);
router.get('/usuarios/:id', passport.authenticate('jwt', { session: false }), getUsuario);
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/token', refresh);
router.put('/usuarios/:id', passport.authenticate('jwt', { session: false }), updateUsuario);
router.delete('/usuarios/:id', passport.authenticate('jwt', { session: false }), deleteUsuario);

export default router;
