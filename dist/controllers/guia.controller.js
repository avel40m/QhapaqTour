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
exports.updateGuia = exports.createGuia = exports.getGuia = exports.getGuias = void 0;
const usuario_entity_1 = require("../entities/usuario.entity");
const guia_entity_1 = require("../entities/guia.entity");
const rol_enum_1 = require("../utils/rol.enum");
const guia_dto_1 = require("../dto/guia.dto");
const getGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guias = yield guia_entity_1.Guia.find({
            relations: {
                usuario: true
            }
        });
        return res.status(200).json(guias);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getGuias = getGuias;
const getGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guia = yield guia_entity_1.Guia.findOne({
            where: { id: parseInt(id) },
            relations: {
                usuario: true
            }
        });
        if (!guia) {
            return res.status(404).json({
                message: 'Guia no encontrado'
            });
        }
        return res.status(200).json(guia);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getGuia = getGuia;
const createGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, carnet, licencia, cedula } = req.body;
    try {
        const usuario = yield usuario_entity_1.Usuario.findOneBy({ id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        if (usuario.rol !== rol_enum_1.ROL.GUIA) {
            return res.status(404).json({
                message: "No cumple con el rol GUIA"
            });
        }
        const guia = new guia_entity_1.Guia();
        guia.carnet = carnet;
        guia.licencia = licencia;
        guia.cedula = cedula;
        yield guia.save();
        usuario.guia = guia;
        yield usuario.save();
        const guiaDTO = new guia_dto_1.GuiaDTO;
        email: usuario.email;
        username: usuario.username;
        apellido: usuario.apellido;
        nombre: usuario.nombre;
        dni: usuario.dni;
        carnet: usuario.guia.carnet;
        licencia: usuario.guia.licencia;
        cedula: usuario.guia.cedula;
        return res.status(201).json(guiaDTO);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.createGuia = createGuia;
const updateGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    try {
        const guia = yield guia_entity_1.Guia.findOneBy({ id: parseInt(id) });
        if (!guia) {
            return res.status(404).json({
                message: 'Guia no encontrado'
            });
        }
        yield guia_entity_1.Guia.update({ id: parseInt(id) }, body);
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
exports.updateGuia = updateGuia;
