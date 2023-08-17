import {Router} from 'express';
import { validateTokenCliente } from '../middlewares/validate.token';
import { createComments } from '../controllers/comentario.controller';
const router = Router();

router.post("/comment",validateTokenCliente,createComments)

export default router;