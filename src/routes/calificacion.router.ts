import {Router} from 'express';
import { validateTokenCliente, validateTokenGuia } from '../middlewares/validate.token';
import { createCalificacion, deleteCalificacion, getCalificacionGuia, getCalificacionRecorrido } from '../controllers/calificacion.controller';
const router = Router();

router.post("/reservas/:id/comments",validateTokenCliente,createCalificacion);

router.delete("/reservas/:id/comments/",validateTokenCliente,deleteCalificacion);

router.get('/reservas/:id/comments', getCalificacionRecorrido);

router.get('/calificacion/guia',validateTokenGuia,getCalificacionGuia);

export default router;