import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express';
import { Usuario } from '../entities/usuario.entity'
import { Guia } from '../entities/guia.entity';
import { Lugar } from '../entities/lugar.entity';
import { Recorrido } from '../entities/recorrido.entity';


interface RecorridoBody {
    precio: number;
    duracion: number;
    guia: number;
    lugar: number;
}

interface TypedRequest<U extends ParamsDictionary, T> extends Request {
    params: U
    body: T
}

export const getRecorridos = async (req: Request, res: Response) => {
    try {
        const recorridos = await Recorrido.find({ 
            relations: {
                guia: true,
                lugar: true
            }
        });
        return res.status(200).json(recorridos);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const getRecorrido = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params
    try {
        const recorrido = await Recorrido.findOne({ 
            where: { id: parseInt(id) },
            relations: {
                guia: true,
                lugar: true
            }
        });
        if (!recorrido) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }
        return res.status(200).json(recorrido);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const createRecorrido = async (req: TypedRequest<{}, RecorridoBody>, res: Response) => {
    const { precio, duracion, guia, lugar } = req.body;
    try {
        if (!precio || !duracion || !guia || !lugar) {
            return res.status(400).json({
                message: 'El precio, la duración, el guía y lugar son requeridos.'
            });
        }

        const guiaEncontrado = await Guia.findOneBy({ id: guia })
        if (!guiaEncontrado) {
            return res.status(404).json({
                message: 'Guía no encontrado'
            });
        }

        const lugarEncontrado = await Lugar.findOneBy({ id: lugar })
        if (!lugarEncontrado) {
            return res.status(404).json({
                message: 'Lugar no encontrado'
            });
        }

        const recorrido = new Recorrido();
        recorrido.precio = precio;
        recorrido.duracion = duracion;
        recorrido.guia = guiaEncontrado;
        recorrido.lugar = lugarEncontrado;

        await recorrido.save();

        return res.status(201).json(recorrido);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const updateRecorrido = async (req: TypedRequest<{ id: string }, RecorridoBody>, res: Response) => {
    const { id } = req.params;
    const { precio, duracion, guia, lugar } = req.body;

    try {
        const recorridoEncontrado = await Recorrido.findOneBy({ id: parseInt(id) });
        if (!recorridoEncontrado) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }

        const guiaEncontrado = await Guia.findOneBy({ id: guia })
        if (!guiaEncontrado) {
            return res.status(404).json({
                message: 'Guía no encontrado'
            });
        }

        const lugarEncontrado = await Lugar.findOneBy({ id: lugar })
        if (!lugarEncontrado) {
            return res.status(404).json({
                message: 'Lugar no encontrado'
            });
        }

        const body = {
            precio,
            duracion,
            guia: guiaEncontrado,
            lugar: lugarEncontrado
        }

        await Recorrido.update({ id: parseInt(id) }, body);

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const deleteRecorrido = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Recorrido.delete({ id: parseInt(id) });

        if (result.affected === 0) {
            return res.status(404).json({
                message: 'Recorrido no encontrado'
            });
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}