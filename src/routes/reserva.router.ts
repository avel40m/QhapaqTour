import { Router } from 'express';
import { validateTokenCliente } from '../middlewares/validate.token';
import { createReserva, generatePago, getReserva, getReservas, myReservas } from '../controllers/reservas.controller';

const router = Router();

router.get('/reservas/:id', validateTokenCliente, getReserva);
router.get('/reservas', validateTokenCliente, getReservas);
router.post("/reservas", validateTokenCliente, createReserva);
router.get("/reserva",validateTokenCliente,myReservas);
router.post("/reservas/:idreservas/pago", validateTokenCliente, generatePago);

export default router;