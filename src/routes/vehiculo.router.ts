import { Router } from 'express';
import { validateTokenGuia } from '../middlewares/validate.token';
import {
   createVehiculoForGuia,
   deleteVehiculo,
   getVehiculo,
   getVehiculos,
   updateVehiculo
} from './../controllers/vehiculo.controller';

const router = Router();

router.post('/vehiculos', validateTokenGuia ,createVehiculoForGuia);
router.get('/vehiculos', getVehiculos);
router.get('/vehiculos/:id',validateTokenGuia ,getVehiculo);
router.put('/vehiculos/:id',validateTokenGuia ,updateVehiculo);
router.delete('/vehiculos/:id',validateTokenGuia ,deleteVehiculo);

export default router;
