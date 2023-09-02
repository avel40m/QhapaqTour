import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express';
import { Usuario } from '../entities/usuario.entity';
import { Guia } from '../entities/guia.entity';
import { ROL } from '../utils/rol.enum';
import { GuiaDTO } from '../dto/guia.dto';

interface GuiaBody {
    usuarioId: number;
    carnet: string;
    licencia: number;
    cedula: string;
}

interface TypedRequest<U extends ParamsDictionary, T> extends Request {
    params: U
    body: T
}

export const getGuias = async (req: Request, res: Response) => {
    try {
        const guias = await Guia.find({
            relations: {
                usuario: true
            }
        });
        return res.status(200).json(guias);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export const getGuia = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params
    try {
        const guia = await Guia.findOne({
            where: { id: parseInt(id) },
            relations: {
                usuario: true
            }
        });
        if (!guia) {
            return res.status(404).json({
                message: 'Guia no encontrado'
            });
        }
        return res.status(200).json(guia);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export const createGuia = async (req: TypedRequest<{}, GuiaBody>, res: Response) => {
    const { usuarioId, carnet, licencia, cedula } = req.body;
    try {
        const usuario = await Usuario.findOneBy({ id: usuarioId });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        if (usuario.rol !== ROL.GUIA) {
            return res.status(404).json({
                message: "No cumple con el rol GUIA"
            })
        }
        const guia = new Guia();
        guia.carnet = carnet;
        guia.licencia = licencia;
        guia.cedula = cedula;

        await guia.save();

        usuario.guia = guia;

        await usuario.save();

        const guiaDTO = new GuiaDTO;
        email: usuario.email;
        username: usuario.username; 
        apellido: usuario.apellido;
        nombre: usuario.nombre;
        dni: usuario.dni;
        carnet: usuario.guia.carnet;
        licencia: usuario.guia.licencia;
        cedula: usuario.guia.cedula;
        return res.status(201).json(guiaDTO);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export const updateGuia = async (req: TypedRequest<{ id: string }, GuiaBody>, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const guia = await Guia.findOneBy({ id: parseInt(id) });
        if (!guia) {
            return res.status(404).json({
                message: 'Guia no encontrado'
            });
        }

        await Guia.update({ id: parseInt(id) }, body);

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}