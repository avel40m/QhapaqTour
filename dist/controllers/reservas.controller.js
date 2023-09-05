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
exports.generatePago = exports.myReservas = exports.createReserva = exports.getReserva = exports.getReservas = void 0;
const reservas_entity_1 = require("../entities/reservas.entity");
const usuario_entity_1 = require("../entities/usuario.entity");
const recorrido_entity_1 = require("../entities/recorrido.entity");
const recorrido_dto_1 = require("../dto/recorrido.dto");
const pago_entity_1 = require("../entities/pago.entity");
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservas = yield reservas_entity_1.Reservas.find({
            relations: {
                usuario: true,
                recorrido: true
            }
        });
        return res.status(200).json(reservas);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getReservas = getReservas;
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reserva = yield reservas_entity_1.Reservas.findOneBy({ id: parseInt(id) });
        if (!reserva) {
            return res.status(404).json({
                message: 'Reserva no encontrada'
            });
        }
        return res.status(200).json(reserva);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getReserva = getReserva;
const createReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { clienteId, recorridoId, cantidadPersonas, fechaHora } = req.body;
    try {
        // Controlar existencia del cliente
        const cliente = yield usuario_entity_1.Usuario.findOneBy({ id: clienteId });
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        // Controlar existencia del recorrido
        const recorrido = yield recorrido_entity_1.Recorrido.findOneBy({ id: recorridoId });
        if (!recorrido) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }
        // Controlar cantidad de personas
        if (cantidadPersonas > recorrido.cantidadPersonas) {
            return res.status(400).json({
                message: 'La cantidad de pasajeros excede la capacidad del vehículo.'
            });
        }
        let fecha = new Date(fechaHora);
        const fechaActual = new Date();
        // Controlar que la fecha no sea anterior a la actual
        if (fecha.getTime() < fechaActual.getTime()) {
            return res.status(400).json({
                message: 'La fecha no debe ser anterior a la actual.'
            });
        }
        // Controlar que la fecha no coincida con la de otra reserva
        const existeCoincidencia = (_a = recorrido.reservas) === null || _a === void 0 ? void 0 : _a.some(reserva => reserva.fechaHora.getFullYear() === fecha.getFullYear() &&
            reserva.fechaHora.getMonth() === fecha.getMonth() &&
            reserva.fechaHora.getDate() === fecha.getDate());
        if (existeCoincidencia) {
            return res.status(400).json({
                message: 'Ya existe una reserva para el día seleccionado.'
            });
        }
        const reservaNueva = new reservas_entity_1.Reservas();
        reservaNueva.cantidadPersonas = cantidadPersonas;
        reservaNueva.precio = recorrido.precio;
        reservaNueva.fechaHora = fecha;
        reservaNueva.usuario = cliente;
        reservaNueva.recorrido = recorrido;
        yield reservaNueva.save();
        return res.status(201).json(reservaNueva);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.createReserva = createReserva;
const myReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservas = yield reservas_entity_1.Reservas
            .createQueryBuilder("reservas")
            .leftJoinAndSelect('reservas.recorrido', 'recorrido')
            .leftJoinAndSelect('reservas.pago', 'pago')
            .leftJoinAndSelect("recorrido.lugar", "lugar")
            .leftJoinAndSelect("recorrido.guia", "guia")
            .leftJoinAndSelect("guia.usuario", "usuario")
            .where("reservas.usuarioId = :id", { id: req.idUser })
            .getMany();
        const arregloRecorrido = [];
        reservas.forEach(reservas => {
            const recorridoDto = new recorrido_dto_1.RecorridoDTO();
            recorridoDto.id = reservas.id,
                recorridoDto.cantidadPersonas = reservas.cantidadPersonas,
                recorridoDto.precio = reservas.precio,
                recorridoDto.pago = reservas.pago !== null ? "Pagado" : "No pagado",
                recorridoDto.duracion = reservas.recorrido.duracion,
                recorridoDto.nombre_lugar = reservas.recorrido.lugar.nombre,
                recorridoDto.nombre_localidad = reservas.recorrido.lugar.localidad,
                recorridoDto.nombre_region = reservas.recorrido.lugar.region,
                recorridoDto.nombre_guia = reservas.recorrido.guia.usuario.nombre,
                recorridoDto.apellido_guia = reservas.recorrido.guia.usuario.apellido,
                recorridoDto.carnet_guia = reservas.recorrido.guia.carnet;
            arregloRecorrido.push(recorridoDto);
        });
        res.status(200).json(arregloRecorrido);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.myReservas = myReservas;
const generatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idreservas } = req.params;
        const { metodoPago } = req.body;
        const reservas = yield reservas_entity_1.Reservas
            .createQueryBuilder("reservas")
            .leftJoinAndSelect("reservas.pago", "pago")
            .where("reservas.id=:id", { id: idreservas })
            .getOne();
        if (!reservas) {
            return res.status(404).json({ message: "No se encontro la reserva" });
        }
        if (reservas.pago !== null) {
            return res.status(404).json({ message: "La reserva está pagada" });
        }
        const usuario = yield usuario_entity_1.Usuario.findOneOrFail({ where: req.idUser });
        if (!usuario) {
            return res.status(404).json({ message: "No se encontro el usuario" });
        }
        const pago = pago_entity_1.Pago.create();
        pago.metodoPago = metodoPago;
        pago.total = reservas.cantidadPersonas * reservas.precio;
        pago.usuario = usuario;
        yield pago.save();
        yield reservas_entity_1.Reservas.update(idreservas, {
            pago: pago
        });
        res.status(200).json({ message: "Se realizo el pago" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.generatePago = generatePago;
