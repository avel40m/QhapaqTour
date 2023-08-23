import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express';
import { Reservas } from '../entities/reservas.entity';
import { Usuario } from '../entities/usuario.entity';
import { Recorrido } from '../entities/recorrido.entity';

interface ReservaBody {
    clienteId: number;
    recorridoId: number;
    cantidadPersonas: number;
    fechaHora: string;
    // tiempoInicial: number;
    // tiempoFinal: number;
}

interface TypedRequest<U extends ParamsDictionary, T> extends Request {
    params: U
    body: T
}

export const getReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reservas.find();
        return res.status(200).json(reservas);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const getReserva = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params
    try {
        const reserva = await Reservas.findOneBy({ id: parseInt(id) });
        if (!reserva) {
            return res.status(404).json({
                message: 'Reserva no encontrada'
            });
        }
        return res.status(200).json(reserva);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const createReserva = async (req: TypedRequest<{}, ReservaBody>, res: Response) => {
    const { clienteId, recorridoId, cantidadPersonas, fechaHora } = req.body;
    try {
        // Controlar existencia del cliente
        const cliente = await Usuario.findOneBy({ id: clienteId });
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        // Controlar existencia del recorrido
        const recorrido = await Recorrido.findOneBy({ id: recorridoId });
        if (!recorrido) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }

        // Controlar cantidad de personas
        if (cantidadPersonas > recorrido.cantidadPersonas) {
            return res.status(400).json({
                message: 'La cantidad de pasajeros excede la capacidad del vehículo.'
            });
        }

        // Controlar que la fecha no coincida con la de otra reserva
        let fecha = new Date(fechaHora);
        const existeCoincidencia = recorrido.reservas.some(reserva => 
            reserva.fechaHora.getFullYear() === fecha.getFullYear() &&
            reserva.fechaHora.getMonth() === fecha.getMonth() &&
            reserva.fechaHora.getDate() === fecha.getDate()
        );
        if (existeCoincidencia) {
            return res.status(400).json({
                message: 'Ya existe una reserva para el día seleccionado.'
            });
        }

        const reservaNueva = new Reservas();
        reservaNueva.cantidadPersonas = cantidadPersonas;
        reservaNueva.precio = recorrido.precio;
        reservaNueva.fechaHora = fecha;
        reservaNueva.usuario = cliente;
        reservaNueva.recorrido = recorrido;
        
        await reservaNueva.save();

        return res.status(201).json(reservaNueva);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}