import { Router } from 'express';
import { 
   createLugar, 
   getLugares, 
   getLugar, 
   deleteLugar, 
   updateLugar,
   getImages
} from './../controllers/lugar.controller';
import { validateTokenGuia } from '../middlewares/validate.token';
import { uploadMiddleware } from '../middlewares/upload.multer';

const router = Router();

router.post('/lugares',uploadMiddleware,createLugar);
router.get('/lugares', getLugares);
router.get('/lugares/:id', getLugar);
router.get('/imagen/:idImage/lugares',getImages);
router.put('/lugares/:id', updateLugar);
router.delete('/lugares/:id', deleteLugar);

export default router;
