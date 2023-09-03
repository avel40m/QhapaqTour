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
exports.deleteVehiculo = exports.updateVehiculo = exports.getVehiculo = exports.getVehiculos = exports.createVehiculo = void 0;
const vehiculo_entity_1 = require("./../entities/vehiculo.entity"); // Ajusta la ruta hacia tu entidad Vehiculo
const guia_entity_1 = require("./../entities/guia.entity"); //guia
//el metodo para crear el vehiculo
const createVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { asientos, tipo, guiaId } = req.body;
        const vehiculo = new vehiculo_entity_1.Vehiculo();
        vehiculo.asientos = asientos;
        vehiculo.tipo = tipo;
        const guia = yield guia_entity_1.Guia.findOneBy({ id: guiaId });
        //    const guia = await Guia.findOne(guiaId);
        if (!guia)
            return res.status(404).json({ message: "Guia not found" });
        vehiculo.guia = guia;
        yield vehiculo.save();
        return res.json(vehiculo);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Data truncated for column 'tipo'")) {
                return res.status(400).json({
                    message: 'El tipo solo puede tomar los valores MOTO, AUTO, CAMIONETA, COLECTIVO, VAN, TRAFIC y MINIBUS.'
                });
            }
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createVehiculo = createVehiculo;
//trae todos los elementos
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield vehiculo_entity_1.Vehiculo.find();
        return res.json(vehiculos);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getVehiculos = getVehiculos;
//traer un objeto
const getVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vehiculo = yield vehiculo_entity_1.Vehiculo.findOneBy({ id: parseInt(id) });
        if (!vehiculo)
            return res.status(404).json({ message: "Vehiculo not found" });
        return res.json(vehiculo);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getVehiculo = getVehiculo;
//modifica los datos de vehiculo con el id
const updateVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //      const vehiculo = await Vehiculo.findOne(id, { relations: ["guia"] });
        //      const vehiculo = await Vehiculo.findOne({ where: { id }, relations: ["guia"] });
        const vehiculo = yield vehiculo_entity_1.Vehiculo.findOne({ where: { id: Number(id) }, relations: ["guia"] });
        if (!vehiculo)
            return res.status(404).json({ message: "Vehiculo not found" });
        const { asientos, tipo, guiaId } = req.body;
        vehiculo.asientos = asientos;
        vehiculo.tipo = tipo;
        //      const guia = await Guia.findOne(guiaId);
        const guia = yield guia_entity_1.Guia.findOne({ where: { id: guiaId } });
        if (!guia)
            return res.status(404).json({ message: "Guia not found" });
        vehiculo.guia = guia;
        yield vehiculo.save();
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Data truncated for column 'tipo'")) {
                return res.status(400).json({
                    message: 'El tipo solo puede tomar los valores AUTOMOVIL, CAMIONETA y MOTOCICLETA.'
                });
            }
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateVehiculo = updateVehiculo;
//elimina vehiculo con el id
const deleteVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield vehiculo_entity_1.Vehiculo.delete({ id: parseInt(id) });
        if (result.affected === 0)
            return res.status(404).json({ message: "Vehiculo not found" });
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteVehiculo = deleteVehiculo;
/**pedir ayuda por el tema de guia */ 
