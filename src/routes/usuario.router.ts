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

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuario);
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/token', refresh);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);

export default router;
