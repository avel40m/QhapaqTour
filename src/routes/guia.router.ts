import { Router } from 'express';
import { validateTokenGuia } from '../middlewares/validate.token';
import {
   createOrUpdateGuide,
   getGuia,
   getGuias,
   updateGuia
} from './../controllers/guia.controller';

const router = Router();

router.post('/guias', validateTokenGuia,createOrUpdateGuide);
router.get('/guias', getGuias);
router.get('/guias/:id', getGuia);
router.put('/guias/:id', updateGuia);

export default router;
