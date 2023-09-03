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
exports.Recorrido = void 0;
const typeorm_1 = require("typeorm");
const lugar_entity_1 = require("./lugar.entity");
const guia_entity_1 = require("./guia.entity");
const calificacion_entity_1 = require("./calificacion.entity");
const reservas_entity_1 = require("./reservas.entity");
let Recorrido = exports.Recorrido = class Recorrido extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Recorrido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recorrido.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recorrido.prototype, "duracion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Recorrido.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Recorrido.prototype, "cantidadPersonas", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Recorrido.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => guia_entity_1.Guia, guia => guia.recorridos),
    __metadata("design:type", guia_entity_1.Guia)
], Recorrido.prototype, "guia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lugar_entity_1.Lugar, lugar => lugar.recorridos),
    __metadata("design:type", lugar_entity_1.Lugar)
], Recorrido.prototype, "lugar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calificacion_entity_1.Calificacion, calificacion => calificacion.recorrido, { cascade: true }),
    __metadata("design:type", Array)
], Recorrido.prototype, "calificaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservas_entity_1.Reservas, reservas => reservas.recorrido, { cascade: true }),
    __metadata("design:type", Array)
], Recorrido.prototype, "reservas", void 0);
exports.Recorrido = Recorrido = __decorate([
    (0, typeorm_1.Entity)()
], Recorrido);
