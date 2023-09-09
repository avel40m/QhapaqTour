import {Router} from 'express';
import { validateTokenCliente } from '../middlewares/validate.token';
import { createCalificacion, deleteCalificacion, getCalificacionRecorrido } from '../controllers/calificacion.controller';
const router = Router();

router.post("/reservas/:id/comments",validateTokenCliente,createCalificacion);

router.delete("/reservas/:id/comments/",validateTokenCliente,deleteCalificacion);

router.get('/reservas/:id/comments', getCalificacionRecorrido);

export default router;