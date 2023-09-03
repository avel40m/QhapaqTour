"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const guia_entity_1 = require("./entities/guia.entity");
const vehiculo_entity_1 = require("./entities/vehiculo.entity");
const reservas_entity_1 = require("./entities/reservas.entity");
const calificacion_entity_1 = require("./entities/calificacion.entity");
const lugar_entity_1 = require("./entities/lugar.entity");
const pago_entity_1 = require("./entities/pago.entity");
const recorrido_entity_1 = require("./entities/recorrido.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'QhapaqTour',
    // synchronize: true,
    entities: [usuario_entity_1.Usuario, guia_entity_1.Guia, vehiculo_entity_1.Vehiculo, reservas_entity_1.Reservas, calificacion_entity_1.Calificacion, recorrido_entity_1.Recorrido, lugar_entity_1.Lugar, pago_entity_1.Pago]
});
