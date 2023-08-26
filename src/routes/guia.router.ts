import { Router } from 'express';
import { 
   createGuia, 
   getGuias, 
   getGuia,
   updateGuia
} from './../controllers/guia.controller';

const router = Router();

router.post('/guias', createGuia);
router.get('/guias', getGuias);
router.get('/guias/:id', getGuia);
router.put('/guias/:id', updateGuia);

export default router;
