"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = exports.deleteLugar = exports.updateLugar = exports.getLugar = exports.getLugares = exports.createLugar = void 0;
const lugar_entity_1 = require("./../entities/lugar.entity");
const regiones_enum_1 = require("./../utils/regiones.enum");
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Definición de las regiones y sus lugares
const regionesYlugares = {
    [regiones_enum_1.REGIONES.PUNA]: [
        "ABRA PAMPA",
        "BARRANCAS (ABDÓN CASTRO TOLAY)",
        "SUSQUES",
        "CABRERIA",
        "CASABINDO",
        "COCHINOCA",
        "CUSI CUSI",
        "EL MORENO",
        "LA QUIACA",
        "RINCONADA",
        "RINCONADILLAS",
        "SAN FRANCISCO DE ALFARCITO",
        "SAN JUAN Y OROS",
        "SANTA CATALINA",
        "SANTUARIO DE TRES POZOS",
        "SAUSALITO",
        "YAVI",
    ],
    [regiones_enum_1.REGIONES.QUEBRADA]: [
        "ABRA PAMPA",
        "BARRANCAS",
        "SUSQUES",
        "CABRERÍA",
        "CASABINDO",
        "COCHINOCA",
        "CUSI CUSI",
        "EL MORENO",
        "LA QUIACA",
        "RINCONADA",
        "RINCONADILLAS",
        "SAN FRANCISCO DE AFARCITO",
        "SAN JUAN Y OROS",
        "SANTA CATALINA",
        "SANTUARIO DE TRES POZOS",
        "SAUSALITO",
        "YAVI",
    ],
    [regiones_enum_1.REGIONES.VALLE]: [
        "ANGOSTO DE JAIRO",
        "EL CARMEN",
        "SAN SALVADOR DE JUJUY",
        "YALA",
        "LOZANO",
        "OCLOYAS",
        "PALPALÁ",
        "PERICO",
        "SAN ANTONIO",
        "TIRAXI",
        "VILLA JARDIN DE REYES",
    ],
    [regiones_enum_1.REGIONES.YUNGA]: [
        "SAN FRANCISCO",
        "VILLAMONTE",
        "CALILEGUA",
        "ECOPORTAL DE PIEDRA",
        "LIBERTADOR GENERAL SAN MARTÍN",
        "PAMPICHUELA",
        "SAN PEDRO DE JUJUY",
        "VALLE GRANDE",
    ],
};
const createLugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, latitud, longitud, localidad, regiones, url } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(404).json({ message: "No envio imagen" });
        }
        const result = yield cloudinary.uploader.upload(file.path);
        if (!result) {
            return res.status(404).json({ message: "no se pudo guardar la imagen en cloudinary" });
        }
        const lugar = new lugar_entity_1.Lugar();
        lugar.nombre = nombre;
        lugar.latitud = latitud;
        lugar.longitud = longitud;
        lugar.localidad = localidad;
        lugar.regiones = regiones;
        lugar.url = result.url;
        yield lugar.save();
        return res.json(lugar);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createLugar = createLugar;
const getLugares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lugares = yield lugar_entity_1.Lugar.find();
        return res.json(lugares);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getLugares = getLugares;
const getLugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const lugar = yield lugar_entity_1.Lugar.findOneBy({ id: parseInt(id) });
        if (!lugar)
            return res.status(404).json({ message: "Lugar not found" });
        return res.json(lugar);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getLugar = getLugar;
const updateLugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const lugar = yield lugar_entity_1.Lugar.findOneBy({ id: parseInt(id) });
        if (!lugar)
            return res.status(404).json({ message: "Lugar not found" });
        // Actualizar los datos del lugar según el cuerpo de la solicitud
        const { nombre, latitud, longitud, localidad, regiones, url } = req.body;
        lugar.nombre = nombre;
        lugar.latitud = latitud;
        lugar.longitud = longitud;
        lugar.localidad = localidad;
        lugar.regiones = regiones;
        lugar.url = url;
        // No es necesario actualizar los recorridos ya que no estamos creando nuevos recorridos aquí
        yield lugar.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateLugar = updateLugar;
const deleteLugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield lugar_entity_1.Lugar.delete(id);
        if (result.affected === 0)
            return res.status(404).json({ message: "Lugar not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteLugar = deleteLugar;
const getImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idImage } = req.params;
        const lugar = yield lugar_entity_1.Lugar.findOneOrFail({ where: { id: Number(idImage) } });
        if (!lugar)
            return res.status(404).json({ message: "Imagen no encontrada" });
        const imagePath = path_1.default.join(__dirname, '../images/', lugar.url);
        res.sendFile(imagePath);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getImages = getImages;
