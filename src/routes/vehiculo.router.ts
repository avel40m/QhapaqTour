import { Router } from 'express';
import { 
   createVehiculo, 
<<<<<<< HEAD
   deleteVehiculo, 
   getVehiculo, 
   getVehiculos, 
   updateVehiculo
=======
   getVehiculos, 
   getVehiculo, 
   updateVehiculo,
   deleteVehiculo 
>>>>>>> 1359e5d6ca1d03afbd3207af2704be80b86e37ca
} from './../controllers/vehiculo.controller';

const router = Router();

router.post('/vehiculo', createVehiculo);
<<<<<<< HEAD
router.get('/vehiculo', getVehiculo);
router.get('/vehiculo/:id', getVehiculos);
=======
router.get('/vehiculos', getVehiculos);
router.get('/vehiculo/:id', getVehiculo);
>>>>>>> 1359e5d6ca1d03afbd3207af2704be80b86e37ca
router.put('/vehiculo/:id', updateVehiculo);
router.delete('/vehiculo/:id', deleteVehiculo);

export default router;
