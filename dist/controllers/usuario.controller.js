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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.signUp = exports.signIn = exports.getUsuario = exports.getUsuarios = exports.refresh = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_entity_1 = require("../entities/usuario.entity");
const usuario_dto_1 = require("../dto/usuario.dto");
const jwtSecret = 'somesecrettoken';
const jwtRefreshTokenSecret = 'somesecrettokenrefresh';
let refreshTokens = [];
const createToken = (usuario) => {
    const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email, rol: usuario.rol }, jwtSecret, { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.default.sign({ email: usuario.email, rol: usuario.rol }, jwtRefreshTokenSecret, { expiresIn: '90d' });
    refreshTokens.push(refreshToken);
    return {
        token,
        refreshToken
    };
};
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refresh;
    if (!refreshToken)
        return res.status(401).json({
            errors: [{ message: 'Token no encontrado' }]
        });
    if (!refreshTokens.includes(refreshToken))
        return res.status(403).json({
            errors: [{ message: 'refresh token inválido' }]
        });
    try {
        const usuario = jsonwebtoken_1.default.verify(refreshToken, jwtRefreshTokenSecret);
        const { email } = usuario;
        const usuarioEncontrado = yield usuario_entity_1.Usuario.findOneBy({ email });
        if (!usuarioEncontrado)
            return res.status(400).json({
                message: 'El usuario no existe'
            });
        const accessToken = jsonwebtoken_1.default.sign({ id: usuarioEncontrado.id, email: usuarioEncontrado.email, rol: usuarioEncontrado.rol }, jwtSecret, { expiresIn: '60s' });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(403).json({
            errors: [{ message: "token inválido" }]
        });
    }
});
exports.refresh = refresh;
const comparePassword = (usuario, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, usuario.password);
});
const createHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_entity_1.Usuario.find({
            relations: {
                guia: true
            }
        });
        return res.status(200).json(usuarios);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_entity_1.Usuario.findOneBy({ id: parseInt(id) });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        return res.status(200).json(usuario);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.getUsuario = getUsuario;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        if (!password || !email) {
            return res.status(400).json({
                message: 'Envia tu email y tu contraseña.'
            });
        }
        const usuarioEncontrado = yield usuario_entity_1.Usuario.createQueryBuilder('usuario')
            .where('usuario.email = :email or usuario.username = :email2', { email: email, email2: email })
            .getOne();
        if (!usuarioEncontrado) {
            return res.status(400).json({
                message: 'El usuario no existe.'
            });
        }
        const isMatch = yield comparePassword(usuarioEncontrado, password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Credenciales incorrectas.'
            });
        }
        return res.status(201).cookie("credentials", createToken(usuarioEncontrado)).json({
            message: "Usuario logueado correctamente",
            token: createToken(usuarioEncontrado)
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, username, apellido, nombre, dni, rol } = req.body;
    try {
        if (!password || !email) {
            return res.status(400).json({
                message: 'El email y la contraseña son requeridos.'
            });
        }
        const usuarioEncontrado = yield usuario_entity_1.Usuario.findOneBy({ email });
        if (usuarioEncontrado) {
            return res.status(400).json({
                message: 'El email o nombre de usuario ya existe.'
            });
        }
        const nuevoUsuario = new usuario_entity_1.Usuario();
        nuevoUsuario.email = email;
        nuevoUsuario.username = username;
        nuevoUsuario.apellido = apellido;
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.dni = dni;
        nuevoUsuario.rol = rol;
        nuevoUsuario.password = yield createHash(password);
        yield nuevoUsuario.save();
        const usuarioDTO = new usuario_dto_1.UsuarioDTO;
        usuarioDTO.email = email;
        usuarioDTO.username = username;
        usuarioDTO.apellido = apellido;
        usuarioDTO.nombre = nombre;
        usuarioDTO.dni = dni;
        usuarioDTO.rol = rol;
        return res.status(201).json(usuarioDTO);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Data truncated for column 'rol'")) {
                return res.status(400).json({
                    message: 'El rol solo puede tomar los valores ADMIN, CLIENTE o GUIA.'
                });
            }
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.signUp = signUp;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuarioEncontrado = yield usuario_entity_1.Usuario.findOneBy({ id: parseInt(id) });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        if (req.body.password) {
            req.body.password = yield createHash(req.body.password);
        }
        yield usuario_entity_1.Usuario.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('invalid input value for enum')) {
                return res.status(400).json({
                    message: 'El rol solo puede tomar los valores ADMIN, CLIENTE o GUIA.'
                });
            }
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield usuario_entity_1.Usuario.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
});
exports.deleteUsuario = deleteUsuario;
