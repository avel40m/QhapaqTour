import { Router } from 'express';
import { 
   createVehiculo, 
   getVehiculos, 
   getVehiculo, 
   updateVehiculo,
   deleteVehiculo 
} from './../controllers/vehiculo.controller';

const router = Router();

router.post('/vehiculos', createVehiculo);
router.get('/vehiculos', getVehiculos);
router.get('/vehiculos/:id', getVehiculo);
router.put('/vehiculos/:id', updateVehiculo);
router.delete('/vehiculos/:id', deleteVehiculo);

export default router;
