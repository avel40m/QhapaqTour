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
exports.Guia = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const vehiculo_entity_1 = require("./vehiculo.entity");
const recorrido_entity_1 = require("./recorrido.entity");
let Guia = exports.Guia = class Guia extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Guia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guia.prototype, "carnet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Guia.prototype, "licencia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guia.prototype, "cedula", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Guia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Guia.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.guia),
    __metadata("design:type", usuario_entity_1.Usuario)
], Guia.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehiculo_entity_1.Vehiculo, (vehiculo) => vehiculo.guia, { cascade: true }),
    __metadata("design:type", Array)
], Guia.prototype, "vehiculos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recorrido_entity_1.Recorrido, (recorrido) => recorrido.guia, { cascade: true }),
    __metadata("design:type", Array)
], Guia.prototype, "recorridos", void 0);
exports.Guia = Guia = __decorate([
    (0, typeorm_1.Entity)()
], Guia);
