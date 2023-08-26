import { Router } from 'express';
import { 
   createVehiculo, 
   getVehiculos, 
   getVehiculo, 
   updateVehiculo,
   deleteVehiculo 
} from './../controllers/vehiculo.controller';
import { validateTokenGuia } from '../middlewares/validate.token';

const router = Router();

router.post('/vehiculos', validateTokenGuia ,createVehiculo);
router.get('/vehiculos', getVehiculos);
router.get('/vehiculos/:id',validateTokenGuia ,getVehiculo);
router.put('/vehiculos/:id',validateTokenGuia ,updateVehiculo);
router.delete('/vehiculos/:id',validateTokenGuia ,deleteVehiculo);

export default router;
