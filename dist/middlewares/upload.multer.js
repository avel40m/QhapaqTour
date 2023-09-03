"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const filename = new Date().getTime().toString() + path_1.default.extname(file.originalname);
        cb(null, filename);
    }
});
exports.uploadMiddleware = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const filetype = /jpeg|jpg|png|gif/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path_1.default.extname(file.originalname));
        if (mimetype && extname) {
            cb(null, true);
            return;
        }
        cb(new Error('Error: Solo se admiten archivos con extensión "jpeg", "jpg", "png" o "gif"'));
    }
}).single('picture');
