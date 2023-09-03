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
exports.Reservas = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const pago_entity_1 = require("./pago.entity");
const recorrido_entity_1 = require("./recorrido.entity");
let Reservas = exports.Reservas = class Reservas extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reservas.prototype, "cantidadPersonas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reservas.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservas.prototype, "fechaHora", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservas.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reservas.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, usuario => usuario.reservas),
    __metadata("design:type", usuario_entity_1.Usuario)
], Reservas.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pago_entity_1.Pago),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", pago_entity_1.Pago)
], Reservas.prototype, "pago", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recorrido_entity_1.Recorrido, recorrido => recorrido.reservas),
    __metadata("design:type", recorrido_entity_1.Recorrido)
], Reservas.prototype, "recorrido", void 0);
exports.Reservas = Reservas = __decorate([
    (0, typeorm_1.Entity)()
], Reservas);
