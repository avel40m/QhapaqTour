import { Router } from 'express';
import { validateTokenCliente } from '../middlewares/validate.token';
import { createReserva, getReserva, getReservas } from '../controllers/reservas.controller';

const router = Router();

router.get('/reservas/:id', validateTokenCliente, getReserva);
router.get('/reservas', validateTokenCliente, getReservas);
router.post("/reservas", validateTokenCliente, createReserva);

export default router;