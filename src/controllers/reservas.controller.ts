import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express';
import { Reservas } from '../entities/reservas.entity';
import { Usuario } from '../entities/usuario.entity';
import { Recorrido } from '../entities/recorrido.entity';
import { RecorridoDTO } from '../dto/recorrido.dto';
import { Pago } from '../entities/pago.entity';
import { reservaClienteDTO, reservasDTO } from '../dto/reservas.dto';

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
        const reservas = await Reservas.find({
            relations: {
                usuario: true,
                recorrido: true
            }
        });

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
        
        let fecha = new Date(fechaHora);
        const fechaActual = new Date();
        // Controlar que la fecha no sea anterior a la actual
        if(fecha.getTime() < fechaActual.getTime()){
            return res.status(400).json({
                message: 'La fecha no debe ser anterior a la actual.'
            });
        }

        // Controlar que la fecha no coincida con la de otra reserva
        const existeCoincidencia = recorrido.reservas?.some(reserva => 
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
        reservaNueva.precio = recorrido.precio * cantidadPersonas;
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

export const myReservas = async (req:Request,res:Response) => {
    try {
        const reservas = await Reservas
        .createQueryBuilder("reservas")
        .leftJoinAndSelect('reservas.recorrido', 'recorrido')
        .leftJoinAndSelect('reservas.pago', 'pago')
        .leftJoinAndSelect("recorrido.lugar","lugar")
        .leftJoinAndSelect("recorrido.guia","guia")
        .leftJoinAndSelect("guia.usuario","usuario")
        .where("reservas.usuarioId = :id",{id: req.idUser})
        .getMany();

        const arregloReservas: RecorridoDTO[] = [];
        reservas.forEach(reserva => {
            const reservaDto = new reservaClienteDTO();

            reservaDto.id = reserva.id,
            reservaDto.cantidadPersonas = reserva.cantidadPersonas,
            reservaDto.precio = reserva.precio,
            reservaDto.fecha = reserva.fechaHora.toISOString(),
            reservaDto.pago = reserva.pago !== null ? "Pagado" : "No pagado",
            reservaDto.duracion = reserva.recorrido.duracion,
            reservaDto.nombre_lugar = reserva.recorrido.lugar.nombre,
            reservaDto.nombre_localidad = reserva.recorrido.lugar.localidad,
            reservaDto.nombre_region = reserva.recorrido.lugar.region,
            reservaDto.nombre_guia = reserva.recorrido.guia.usuario.nombre,
            reservaDto.apellido_guia = reserva.recorrido.guia.usuario.apellido,
            reservaDto.carnet_guia = reserva.recorrido.guia.carnet
            arregloReservas.push(reservaDto);
        })

        res.status(200).json(arregloReservas);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const generatePago = async (req:Request,res:Response) => {
    try {
        const { idreservas } = req.params;
        const { metodoPago } = req.body;
        const reservas = await Reservas
        .createQueryBuilder("reservas")
        .leftJoinAndSelect("reservas.pago","pago")
        .where("reservas.id=:id",{id:idreservas})
        .getOne();
        if (!reservas) {
            return res.status(404).json({message:"No se encontro la reserva"})
        }
        
        if (reservas.pago !== null) {
            return res.status(404).json({message:"La reserva está pagada"});
        }

        const usuario = await Usuario.findOneOrFail({where: req.idUser});
        if (!usuario) {
            return res.status(404).json({message:"No se encontro el usuario"})
        }

        const pago = Pago.create();
        pago.metodoPago = metodoPago;
        pago.total = reservas.precio;
        pago.usuario = usuario;
        await pago.save();

        await Reservas.update(idreservas,{
            pago: pago
        });
        res.status(200).json({message:"Se realizo el pago"})
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const getReservasGuias = async (req:Request,res:Response) => {
    const usuarioId = req.idUser;
    try {
        const usuario = await Usuario.findOne({where: {id: usuarioId},relations: ['guia']});
        if (!usuario)
            return res.status(404).json({message:'Usuario no encontrado'});
        if (usuario.guia == null)
            return res.status(404).json({message:"No es un usuario guia"})
        const reservas = await Reservas
        .createQueryBuilder('reservas')
        .leftJoinAndSelect('reservas.recorrido','recorrido')
        .leftJoinAndSelect('reservas.usuario','usuario')
        .leftJoinAndSelect('reservas.pago','pago')
        .leftJoinAndSelect('recorrido.lugar','lugar')
        .where('recorrido.guiaId = :id',{id: usuario.guia.id})
        .getMany();
        const arregloReservas: reservasDTO[] = [];
        reservas.map(reserva => {
            const reservaDTO = new reservasDTO();
            reservaDTO.id = reserva.id;
            reservaDTO.apellido = reserva.usuario.apellido;
            reservaDTO.nombre = reserva.usuario.nombre;
            reservaDTO.cantidad = reserva.cantidadPersonas;
            reservaDTO.precio = reserva.precio;
            reservaDTO.fecha = new Intl.DateTimeFormat('es',{dateStyle: 'medium'}).format(reserva.fechaHora);
            reservaDTO.lugar = reserva.recorrido.lugar.nombre;
            reservaDTO.region = reserva.recorrido.lugar.region;
            reservaDTO.pago = reserva.pago == null ? 'Pago no efectuado' : 'Pago efectuado';
            arregloReservas.push(reservaDTO)
        })
        res.status(200).json(arregloReservas);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }        
    }
}

export const deleteReserva = async (req:Request,res:Response) => {
    const { id } = req.params;
    try {
        const reserva = await Reservas.findOne({where: {id: Number(id)}});
        if(!reserva)
            return res.status(404).json({message:'Reserva no encontrada'});
        await Reservas.delete(reserva.id);
        res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }                
    }
}