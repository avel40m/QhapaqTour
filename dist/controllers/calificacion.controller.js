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
exports.getClasificacionRecorrido = exports.deleteCalificacion = exports.createCalificacion = void 0;
const usuario_entity_1 = require("../entities/usuario.entity");
const calificacion_entity_1 = require("../entities/calificacion.entity");
const recorrido_entity_1 = require("../entities/recorrido.entity");
const clasificacion_dto_1 = require("../dto/clasificacion.dto");
const createCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { note, comentario } = req.body;
        const recorrido = yield recorrido_entity_1.Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const usuario = yield usuario_entity_1.Usuario.findOneOrFail({ where: { id: req.idUser } });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        const calificacion = calificacion_entity_1.Calificacion.create();
        calificacion.note = note;
        calificacion.comentario = comentario;
        calificacion.fecha = new Date(Date.now());
        calificacion.usuario = usuario;
        calificacion.recorrido = recorrido;
        yield calificacion.save();
        res.status(200).json({ message: "calificacion guardado" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.createCalificacion = createCalificacion;
const deleteCalificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const calificacion = yield calificacion_entity_1.Calificacion
            .createQueryBuilder("calificacion")
            .leftJoinAndSelect("calificacion.usuario", "usuario")
            .where("calificacion.id=:id", { id })
            .getOne();
        if (!calificacion)
            return res.status(404).json({ message: "Calificacion no encontrada" });
        if ((calificacion === null || calificacion === void 0 ? void 0 : calificacion.usuario.id) !== req.idUser) {
            return res.status(404).json({ message: "Usted no hizo este comentario" });
        }
        yield calificacion_entity_1.Calificacion.delete(calificacion.id);
        res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteCalificacion = deleteCalificacion;
const getClasificacionRecorrido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const recorrido = yield recorrido_entity_1.Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const calificacion = yield calificacion_entity_1.Calificacion.createQueryBuilder('clasificacion')
            .leftJoinAndSelect('clasificacion.usuario', 'usuario')
            .where('clasificacion.recorridoId = :usuario', { usuario: id })
            .getMany();
        const arregloClasificacion = [];
        calificacion.forEach(calificar => {
            const clasificacionDTO = new clasificacion_dto_1.ClasificacionDTO;
            clasificacionDTO.id = calificar.id;
            clasificacionDTO.nombre = calificar.usuario.nombre;
            clasificacionDTO.apellido = calificar.usuario.apellido;
            clasificacionDTO.note = calificar.note;
            clasificacionDTO.comentario = calificar.comentario;
            clasificacionDTO.fecha = calificar.fecha;
            arregloClasificacion.push(clasificacionDTO);
        });
        return res.status(200).json(arregloClasificacion);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getClasificacionRecorrido = getClasificacionRecorrido;
