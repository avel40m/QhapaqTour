export class reservasDTO {
    apellido: string;
    nombre: string;
    cantidad: number;
    precio: number;
    fecha: string;
    lugar: string;
    region: string;
    pago: string;
}

export class reservaClienteDTO {
    id: number;
    cantidadPersonas: number;
    fecha: string;
    precio: number;
    duracion: number;
    nombre_lugar: string;
    nombre_localidad: string;
    nombre_region: string;
    nombre_guia: string;
    apellido_guia: string;
    carnet_guia: string;
    pago: string;
}