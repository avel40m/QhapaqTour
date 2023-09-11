import { Request, Response } from "express";
import { Usuario } from "../entities/usuario.entity";
import { Calificacion } from "../entities/calificacion.entity";
import { Recorrido } from "../entities/recorrido.entity";
import { CalificacionDTO, CalificacionGuiaDTO } from "../dto/calificacion.dto";

export const createCalificacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { nota, comentario } = req.body;
        const recorrido = await Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const usuario = await Usuario.findOneOrFail({ where: { id: req.idUser } });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        const calificacion = Calificacion.create();
        calificacion.nota = nota;
        calificacion.comentario = comentario;
        calificacion.usuario = usuario;
        calificacion.recorrido = recorrido;
        await calificacion.save();
        res.status(200).json({ message: "calificacion guardada" });
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

export const getCalificacionRecorrido = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const recorrido = await Recorrido.findOneOrFail({ where: { id: Number(id) } });
        if (!recorrido)
            return res.status(404).json({ message: "No se encontro el recorrido" });
        const calificaciones = await Calificacion.createQueryBuilder('calificacion')
            .leftJoinAndSelect('calificacion.usuario', 'usuario')
            .where('calificacion.recorridoId = :usuario', { usuario: id })
            .getMany();
        const arregloCalificacion: CalificacionDTO[] = [];
        calificaciones.forEach(calificacion => {
            const calificacionDTO = new CalificacionDTO;
            calificacionDTO.id = calificacion.id;
            calificacionDTO.nombre = calificacion.usuario.nombre;
            calificacionDTO.apellido = calificacion.usuario.apellido;
            calificacionDTO.nota = calificacion.nota;
            calificacionDTO.comentario = calificacion.comentario;
            calificacionDTO.fecha = calificacion.createdAt;
            arregloCalificacion.push(calificacionDTO)
        })
        return res.status(200).json(arregloCalificacion)
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
}

export const getCalificacionGuia = async (req: Request, res: Response) => {
    const usuarioId = req.idUser;
    try {
        const usuario = await Usuario.findOne({ where: { id: Number(usuarioId) }, relations: ['guia'] });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no encontrado" });
        if (usuario.guia == null)
            return res.status(404).json({ message: "Complete los datos dl guia" });

        const calificaciones = await Calificacion
        .createQueryBuilder("calificacion")
        .leftJoinAndSelect("calificacion.recorrido","recorrido")
        .leftJoinAndSelect("calificacion.usuario","usuario")
        .leftJoinAndSelect("recorrido.lugar","lugar")
        .where("recorrido.guiaId = :id",{id: usuario.guia.id})
        .getMany();
        const arregloCalificacion: CalificacionGuiaDTO[] = [];
        calificaciones.map(calificacion => {
            const calisificacionDTO = new CalificacionGuiaDTO();
            calisificacionDTO.lugar = calificacion.recorrido.lugar.nombre;
            calisificacionDTO.nombre = calificacion.usuario.nombre;
            calisificacionDTO.apellido = calificacion.usuario.apellido;
            calisificacionDTO.nota = calificacion.nota;
            calisificacionDTO.comentario = calificacion.comentario;
            calisificacionDTO.fecha = new Intl.DateTimeFormat('es',{dateStyle: 'full'}).format(calificacion.createdAt);
            arregloCalificacion.push(calisificacionDTO);
        })
        res.status(200).json(arregloCalificacion);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });

    }
}