"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const usuario_router_1 = __importDefault(require("./routes/usuario.router"));
const guia_router_1 = __importDefault(require("./routes/guia.router"));
const vehiculo_router_1 = __importDefault(require("./routes/vehiculo.router"));
const calificacion_router_1 = __importDefault(require("./routes/calificacion.router"));
const lugar_router_1 = __importDefault(require("./routes/lugar.router"));
const recorrido_router_1 = __importDefault(require("./routes/recorrido.router"));
const reserva_router_1 = __importDefault(require("./routes/reserva.router"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// jwt
app.use(express_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
// Routes
app.use("/api", usuario_router_1.default);
app.use("/api", guia_router_1.default);
app.use("/api", vehiculo_router_1.default);
app.use("/api", calificacion_router_1.default);
app.use("/api", lugar_router_1.default);
app.use("/api", recorrido_router_1.default);
app.use("/api", reserva_router_1.default);
exports.default = app;
