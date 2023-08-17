import {Router} from 'express';
import { validateTokenCliente } from '../middlewares/validate.token';
import { createCalificacion, deleteCalificacion, getClasificacionRecorrido } from '../controllers/calificacion.controller';
const router = Router();

router.post("/comment",validateTokenCliente,createCalificacion);

router.delete("/comment/:id",validateTokenCliente,deleteCalificacion);

router.get('/comment/:id', getClasificacionRecorrido);

export default router;