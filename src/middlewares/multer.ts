import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'src/images/')
    },
    filename: (req,file,cb) => {
        const pathName = Date.now() + file.originalname;
        cb(null,pathName)
    }
});

export const upload = multer({storage});