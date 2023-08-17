import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ROL } from '../utils/rol.enum';

interface DecodeToken extends JwtPayload {
    id: number,
    rol: string
}

declare global {
    namespace Express {
        interface Request {
            idUser?: any;
        }
    }
}

export const validateTokenCliente = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.credentials.token;
        if(!token)
            return res.status(401).json({message: 'No se encontro el token'});
        const {id,rol} = jwt.verify(token,'somesecrettoken') as DecodeToken;

        if(rol !== ROL.CLIENTE)
            return res.status(403).json({message:'No tiene permisos'});

        req.idUser = id;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token expirado'})
    }
}

export const validateTokenGuia = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.credentials.token;
        if(!token)
            return res.status(401).json({message: 'No se encontro el token'});
        const {id,rol} = jwt.verify(token,'somesecrettoken') as DecodeToken;

        if(rol !== ROL.GUIA)
            return res.status(403).json({message:'No tiene permisos'});

        req.idUser = id;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token expirado'})
    }
}