import { Request, Response } from "express";
import { Usuario } from "../entities/usuario.entity";
import { Calificacion } from "../entities/calificacion.entity";
import { Recorrido } from "../entities/recorrido.entity";
import { ClasificacionDTO } from "../dto/clasificacion.dto";

export const createCalificacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { note, comentario } = req.body;
        const recorrido = await Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const usuario = await Usuario.findOneOrFail({ where: { id: req.idUser } });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        const calificacion = Calificacion.create();
        calificacion.note = note;
        calificacion.comentario = comentario;
        calificacion.fecha = new Date(Date.now());
        calificacion.usuario = usuario;
        calificacion.recorrido = recorrido;
        await calificacion.save();
        res.status(200).json({ message: "calificacion guardado" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const deleteCalificacion = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const calificacion = await Calificacion
            .createQueryBuilder("calificacion")
            .leftJoinAndSelect("calificacion.usuario", "usuario")
            .where("calificacion.id=:id", { id })
            .getOne();

        if (!calificacion)
            return res.status(404).json({ message: "Calificacion no encontrada" });

        if (calificacion?.usuario.id !== req.idUser) {
            return res.status(404).json({ message: "Usted no hizo este comentario" })
        }

        await Calificacion.delete(calificacion.id);

        res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message })
    }
}

export const getClasificacionRecorrido = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recorrido = await Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const calificacion = await Calificacion.createQueryBuilder('clasificacion')
            .leftJoinAndSelect('clasificacion.usuario', 'usuario')
            .where('clasificacion.recorridoId = :usuario', { usuario: id })
            .getMany();
        const arregloClasificacion: ClasificacionDTO[] = [];
        calificacion.forEach(calificar => {
            const clasificacionDTO = new ClasificacionDTO;
            clasificacionDTO.id = calificar.id;
            clasificacionDTO.nombre = calificar.usuario.nombre;
            clasificacionDTO.apellido = calificar.usuario.apellido;
            clasificacionDTO.note = calificar.note;
            clasificacionDTO.comentario = calificar.comentario;
            clasificacionDTO.fecha = calificar.fecha;
            arregloClasificacion.push(clasificacionDTO)
        })
        return res.status(200).json(arregloClasificacion)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
}