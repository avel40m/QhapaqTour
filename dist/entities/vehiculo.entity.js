"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehiculo = void 0;
const typeorm_1 = require("typeorm");
const vehiculos_enum_1 = require("../utils/vehiculos.enum");
const guia_entity_1 = require("./guia.entity");
let Vehiculo = exports.Vehiculo = class Vehiculo extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehiculo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Vehiculo.prototype, "asientos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: vehiculos_enum_1.TIPO_VEHICULOS
    }),
    __metadata("design:type", String)
], Vehiculo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Vehiculo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Vehiculo.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => guia_entity_1.Guia, (guia) => guia.vehiculos),
    __metadata("design:type", guia_entity_1.Guia)
], Vehiculo.prototype, "guia", void 0);
exports.Vehiculo = Vehiculo = __decorate([
    (0, typeorm_1.Entity)()
], Vehiculo);
