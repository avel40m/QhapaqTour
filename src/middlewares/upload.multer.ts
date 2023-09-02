import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    const filename = new Date().getTime().toString() + path.extname(file.originalname)
    cb(null, filename)
  }
})

export const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetype = /jpeg|jpg|png|gif/
    const mimetype = filetype.test(file.mimetype)
    const extname = filetype.test(path.extname(file.originalname))

    if (mimetype && extname) {
      cb(null, true)
      return
    }
    cb(new Error('Error: Solo se admiten archivos con extensión "jpeg", "jpg", "png" o "gif"'))
  }
}).single('picture')