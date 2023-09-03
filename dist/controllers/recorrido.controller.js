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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecorrido = exports.updateRecorrido = exports.createRecorrido = exports.getRecorrido = exports.getRecorridos = void 0;
const guia_entity_1 = require("../entities/guia.entity");
const lugar_entity_1 = require("../entities/lugar.entity");
const recorrido_entity_1 = require("../entities/recorrido.entity");
const recorrido_dto_1 = require("../dto/recorrido.dto");
const getRecorridos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recorridos = yield recorrido_entity_1.Recorrido.createQueryBuilder("recorrido")
            .leftJoinAndSelect("recorrido.guia", "guia")
            .leftJoinAndSelect("guia.usuario", "usuario")
            .leftJoinAndSelect("recorrido.lugar", "lugar")
            .leftJoinAndSelect("recorrido.calificaciones", "calificaciones")
            .getOne();
        const clasificacionArreglo = [];
        recorridos === null || recorridos === void 0 ? void 0 : recorridos.calificaciones.forEach(calisificacion => {
            clasificacionArreglo.push(calisificacion);
        });
        const recorridoCalificacionDTO = new recorrido_dto_1.RecorridoCalificacionDTO;
        recorridoCalificacionDTO.username = recorridos === null || recorridos === void 0 ? void 0 : recorridos.guia.usuario.username;
        recorridoCalificacionDTO.nombre = recorridos === null || recorridos === void 0 ? void 0 : recorridos.guia.usuario.nombre;
        recorridoCalificacionDTO.apellido = recorridos === null || recorridos === void 0 ? void 0 : recorridos.guia.usuario.apellido;
        recorridoCalificacionDTO.precio = recorridos === null || recorridos === void 0 ? void 0 : recorridos.precio;
        recorridoCalificacionDTO.duracion = recorridos === null || recorridos === void 0 ? void 0 : recorridos.duracion;
        recorridoCalificacionDTO.createdAt = String(recorridos === null || recorridos === void 0 ? void 0 : recorridos.createdAt);
        recorridoCalificacionDTO.cantidadPersonas = recorridos === null || recorridos === void 0 ? void 0 : recorridos.cantidadPersonas;
        recorridoCalificacionDTO.lugar = recorridos === null || recorridos === void 0 ? void 0 : recorridos.lugar;
        recorridoCalificacionDTO.calificaciones = clasificacionArreglo;
        return res.status(200).json(recorridoCalificacionDTO);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getRecorridos = getRecorridos;
const getRecorrido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const recorrido = yield recorrido_entity_1.Recorrido.findOne({
            where: { id: parseInt(id) },
            relations: {
                guia: true,
                lugar: true
            }
        });
        if (!recorrido) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }
        return res.status(200).json(recorrido);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getRecorrido = getRecorrido;
const createRecorrido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { precio, duracion, cantidadPersonas, guia, lugar } = req.body;
    try {
        if (!precio || !duracion || !guia || !lugar) {
            return res.status(400).json({
                message: 'El precio, la duración, el guía y lugar son requeridos.'
            });
        }
        const guiaEncontrado = yield guia_entity_1.Guia.findOneBy({ id: guia });
        if (!guiaEncontrado) {
            return res.status(404).json({
                message: 'Guía no encontrado'
            });
        }
        const lugarEncontrado = yield lugar_entity_1.Lugar.findOneBy({ id: lugar });
        if (!lugarEncontrado) {
            return res.status(404).json({
                message: 'Lugar no encontrado'
            });
        }
        const recorrido = new recorrido_entity_1.Recorrido();
        recorrido.precio = precio;
        recorrido.duracion = duracion;
        recorrido.cantidadPersonas = cantidadPersonas;
        recorrido.guia = guiaEncontrado;
        recorrido.lugar = lugarEncontrado;
        yield recorrido.save();
        return res.status(201).json(recorrido);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.createRecorrido = createRecorrido;
const updateRecorrido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { precio, duracion, guia, lugar } = req.body;
    try {
        const recorridoEncontrado = yield recorrido_entity_1.Recorrido.findOneBy({ id: parseInt(id) });
        if (!recorridoEncontrado) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }
        const guiaEncontrado = yield guia_entity_1.Guia.findOneBy({ id: guia });
        if (!guiaEncontrado) {
            return res.status(404).json({
                message: 'Guía no encontrado'
            });
        }
        const lugarEncontrado = yield lugar_entity_1.Lugar.findOneBy({ id: lugar });
        if (!lugarEncontrado) {
            return res.status(404).json({
                message: 'Lugar no encontrado'
            });
        }
        const body = {
            precio,
            duracion,
            guia: guiaEncontrado,
            lugar: lugarEncontrado
        };
        yield recorrido_entity_1.Recorrido.update({ id: parseInt(id) }, body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.updateRecorrido = updateRecorrido;
const deleteRecorrido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield recorrido_entity_1.Recorrido.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.deleteRecorrido = deleteRecorrido;
