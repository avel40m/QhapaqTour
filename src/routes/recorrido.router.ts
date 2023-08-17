import { Router } from 'express';
import { 
    createRecorrido, 
    deleteRecorrido, 
    getRecorrido, 
    getRecorridos, 
    updateRecorrido,
} from '../controllers/recorrido.controller';

const router = Router();

router.get('/recorridos', getRecorridos);
router.get('/recorridos/:id', getRecorrido);
router.post('/recorridos', createRecorrido);
router.put('/recorridos/:id', updateRecorrido);
router.delete('/recorridos/:id', deleteRecorrido);

export default router;
