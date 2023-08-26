import { Router } from 'express';
import { 
    createRecorrido, 
    deleteRecorrido, 
    getRecorrido, 
    getRecorridos, 
    updateRecorrido,
} from '../controllers/recorrido.controller';
import { validateTokenGuia } from '../middlewares/validate.token';

const router = Router();

router.get('/recorridos', getRecorridos);
router.get('/recorridos/:id', getRecorrido);
router.post('/recorridos', validateTokenGuia, createRecorrido);
router.put('/recorridos/:id', validateTokenGuia, updateRecorrido);
router.delete('/recorridos/:id', validateTokenGuia, deleteRecorrido);

export default router;
