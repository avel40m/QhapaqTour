import { Calificacion } from "../entities/calificacion.entity";
import { Lugar } from "../entities/lugar.entity";

export class RecorridoDTO {
    id: number;
    cantidadPersonas: number;
    pago: string;
    precio: number;
    duracion: number;
    nombre_lugar: string;
    nombre_localidad: string;
    nombre_regiones: string;
    nombre_guia: string;
    apellido_guia: string;
    carnet_guia: string;
}

export class RecorridoCalificacionDTO {
    username: string;
    nombre: string;
    apellido: string;
    precio: number;
    duracion: number;
    createdAt: string;
    cantidadPersonas: number;
    lugar: Lugar;
    calificaciones: Calificacion[]
}