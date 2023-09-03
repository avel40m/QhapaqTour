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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const rol_enum_1 = require("../utils/rol.enum");
const guia_entity_1 = require("./guia.entity");
const reservas_entity_1 = require("./reservas.entity");
const calificacion_entity_1 = require("./calificacion.entity");
const pago_entity_1 = require("./pago.entity");
let Usuario = exports.Usuario = class Usuario extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: rol_enum_1.ROL
    }),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => guia_entity_1.Guia),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", guia_entity_1.Guia)
], Usuario.prototype, "guia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservas_entity_1.Reservas, reservas => reservas.usuario, { cascade: true }),
    __metadata("design:type", Array)
], Usuario.prototype, "reservas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calificacion_entity_1.Calificacion, calificacion => calificacion.usuario, { cascade: true }),
    __metadata("design:type", Array)
], Usuario.prototype, "calificaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, pago => pago.usuario, { cascade: true }),
    __metadata("design:type", Array)
], Usuario.prototype, "pagos", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
