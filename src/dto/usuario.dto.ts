import { Guia } from "../entities/guia.entity";
import { Vehiculo } from "../entities/vehiculo.entity";

export class UsuarioDTO {
    id: number;
    email: string;
    username: string;
    apellido:string;
    nombre:string;
    dni:string;
    rol:string;
}

export class UsuarioGuiaDTO {
    nombre: string;
    apellido: string;
    email: string;
    dni: string;
    guia: Guia;
    vehiculos: Vehiculo[];
}