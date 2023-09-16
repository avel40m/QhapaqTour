import {Router} from 'express';
import { validateTokenCliente, validateTokenGuia } from '../middlewares/validate.token';
import { createCalificacion, deleteCalificacion, getCalificacionGuia, getCalificacionRecorrido } from '../controllers/calificacion.controller';
const router = Router();

router.post("/recorridos/:id/comments",validateTokenCliente,createCalificacion);

router.delete("/recorridos/:id/comments/",validateTokenCliente,deleteCalificacion);

router.get('/recorridos/:id/comments', getCalificacionRecorrido);

router.get('/calificacion/guia',validateTokenGuia,getCalificacionGuia);

export default router;