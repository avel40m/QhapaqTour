import { Router } from 'express';
import { 
   createLugar, 
   getLugares, 
   getLugar, 
   deleteLugar, 
   updateLugar
} from './../controllers/lugar.controller';
import { validateTokenGuia } from '../middlewares/validate.token';

const router = Router();

router.post('/lugares', validateTokenGuia,createLugar);
router.get('/lugares', getLugares);
router.get('/lugares/:id', getLugar);
router.put('/lugares/:id', updateLugar);
router.delete('/lugares/:id', deleteLugar);

export default router;
