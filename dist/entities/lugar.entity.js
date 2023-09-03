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
exports.Lugar = void 0;
const typeorm_1 = require("typeorm");
const regiones_enum_1 = require("../utils/regiones.enum");
const recorrido_entity_1 = require("./recorrido.entity");
let Lugar = exports.Lugar = class Lugar extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lugar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "latitud", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "longitud", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: regiones_enum_1.REGIONES
    }),
    __metadata("design:type", String)
], Lugar.prototype, "regiones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lugar.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lugar.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Lugar.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recorrido_entity_1.Recorrido, recorrido => recorrido.lugar, { cascade: true }),
    __metadata("design:type", Array)
], Lugar.prototype, "recorridos", void 0);
exports.Lugar = Lugar = __decorate([
    (0, typeorm_1.Entity)()
], Lugar);
