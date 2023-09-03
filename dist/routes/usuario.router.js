"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/usuarios', passport_1.default.authenticate('jwt', { session: false }), usuario_controller_1.getUsuarios);
router.get('/usuarios/:id', passport_1.default.authenticate('jwt', { session: false }), usuario_controller_1.getUsuario);
router.post('/signin', usuario_controller_1.signIn);
router.post('/signup', usuario_controller_1.signUp);
router.post('/token', usuario_controller_1.refresh);
router.put('/usuarios/:id', passport_1.default.authenticate('jwt', { session: false }), usuario_controller_1.updateUsuario);
router.delete('/usuarios/:id', passport_1.default.authenticate('jwt', { session: false }), usuario_controller_1.deleteUsuario);
exports.default = router;
