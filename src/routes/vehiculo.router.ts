import { Router } from 'express';
import { 
   createVehiculo, 
   getVehiculos, 
   getVehiculo, 
   updateVehiculo,
   deleteVehiculo 
} from './../controllers/vehiculo.controller';

const router = Router();

router.post('/vehiculo', createVehiculo);
router.get('/vehiculos', getVehiculos);
router.get('/vehiculo/:id', getVehiculo);
router.put('/vehiculo/:id', updateVehiculo);
router.delete('/vehiculo/:id', deleteVehiculo);

export default router;
