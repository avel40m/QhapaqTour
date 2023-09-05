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
const region_enum_1 = require("./../utils/region.enum");
const path_1 = __importDefault(require("path"));
// Definición de las regiones y sus lugares
const regionesYlugares = {
    [region_enum_1.REGION.PUNA]: [
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
    [region_enum_1.REGION.QUEBRADA]: [
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
    [region_enum_1.REGION.VALLES]: [
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
    [region_enum_1.REGION.YUNGAS]: [
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
        const lugar = new lugar_entity_1.Lugar();
        lugar.nombre = nombre;
        lugar.latitud = latitud;
        lugar.longitud = longitud;
        lugar.localidad = localidad;
        lugar.region = regiones;
        lugar.url = url;
        yield lugar.save();
        return res.json(lugar);
        // return res.json('subida');
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
            return res.status(404).json({ message: "Lugar no encontrado" });
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
        const file = req.file;
        const lugar = yield lugar_entity_1.Lugar.findOneBy({ id: parseInt(id) });
        if (!lugar)
            return res.status(404).json({ message: "Lugar no encontrado" });
        // Actualizar los datos del lugar según el cuerpo de la solicitud
        const { nombre, latitud, longitud, localidad, regiones, url } = req.body;
        lugar.nombre = nombre;
        lugar.latitud = latitud;
        lugar.longitud = longitud;
        lugar.localidad = localidad;
        lugar.region = regiones;
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
        const lugar = yield lugar_entity_1.Lugar.findOneBy({ id: parseInt(id) });
        if (!lugar) {
            return res.status(404).json({ message: "Lugar no encontrado" });
        }
        yield lugar_entity_1.Lugar.delete(id);
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
