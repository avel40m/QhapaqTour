import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuario } from '../entities/usuario.entity'
import { ROL } from '../utils/rol.enum';
import { Guia } from '../entities/guia.entity';

const jwtSecret = 'somesecrettoken'
const jwtRefreshTokenSecret = 'somesecrettokenrefresh'
let refreshTokens: (string | undefined)[] = []

interface UserBody {
    password: string;
    email: string;
    username: string;
    apellido: string;
    nombre: string;
    dni: string;
    rol: ROL;

    carnet: string;
    licencia: number;
    cedula: string;
}

interface TypedRequest<U extends ParamsDictionary, T> extends Request {
    params: U
    body: T
}

const createToken = (usuario: Usuario) => {
    const token = jwt.sign({ id: usuario.id, email: usuario.email, rol: usuario.rol }, jwtSecret, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ email: usuario.email, rol: usuario.rol }, jwtRefreshTokenSecret, { expiresIn: '90d' });
    
    refreshTokens.push(refreshToken);
    return {
        token,
        refreshToken
    }
}

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.body.refresh
    if (!refreshToken) return res.status(401).json({
        errors: [{ message: 'Token no encontrado' }]
    })

    if (!refreshTokens.includes(refreshToken)) return res.status(403).json({
        errors: [{ message: 'refresh token inválido' }]
    })

    try {
        const usuario = jwt.verify(refreshToken, jwtRefreshTokenSecret)
        const { email } = <any> usuario
        const usuarioEncontrado = <Usuario> await Usuario.findOneBy({ email })
        if (!usuarioEncontrado) return res.status(400).json({
            message: 'El usuario no existe'
        })

        const accessToken = jwt.sign({ id: usuarioEncontrado.id, email: usuarioEncontrado.email, rol: usuarioEncontrado.rol }, jwtSecret, { expiresIn: '60s' })

        res.json({ accessToken })
    } catch (error) {
        res.status(403).json({
            errors: [{ message: "token inválido" }]
        });
    }
}

const comparePassword = async (usuario: Usuario, password: string): Promise<Boolean> => {
    return await bcrypt.compare(password, usuario.password)
}

const createHash = async (password: string): Promise<string> => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find({ 
            relations: {
                guia: true
            }
        });
        return res.status(200).json(usuarios);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const getUsuario = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params
    try {
        const usuario = await Usuario.findOneBy({ id: parseInt(id) });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const signIn = async (req: TypedRequest<{}, UserBody>, res: Response) => {
    const { password, email } = req.body;
    try {
        if (!password || !email) {
            return res.status(400).json({
                message: 'Envia tu email y tu contraseña.'
            });
        }

        const usuarioEncontrado = await Usuario.createQueryBuilder('usuario')
        .where('usuario.email = :email or usuario.username = :email2',{email: email,email2:email})
        .getOne();

        if (!usuarioEncontrado) {
            return res.status(400).json({
                message: 'El usuario no existe.'
            });
        }

        const isMatch = await comparePassword(usuarioEncontrado, password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Credenciales incorrectas.'
            });
        }
        
        return res.status(201).cookie("credentials",createToken(usuarioEncontrado)).json({
            message:"Usuario loggueado correctamente",
            token: createToken(usuarioEncontrado)
        });
    
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const signUp = async (req: TypedRequest<{}, UserBody>, res: Response) => {
    const { password, email, username, apellido, nombre, dni, rol } = req.body;
    try {
        if (!password || !email) {
            return res.status(400).json({
                message: 'El email y la contraseña son requeridos.'
            });
        }

        const usuarioEncontrado = await Usuario.findOneBy({ email });
        if (usuarioEncontrado) {
            return res.status(400).json({
                message: 'El email o nombre de usuario ya existe.'
            });
        }

        const nuevoUsuario = new Usuario();
        nuevoUsuario.email = email;
        nuevoUsuario.username = username;
        nuevoUsuario.apellido = apellido;
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.dni = dni;
        nuevoUsuario.rol = rol;
        nuevoUsuario.password = await createHash(password);

        if (rol === 'GUIA') {
            const guia = new Guia();
            guia.carnet = req.body.carnet;
            guia.cedula = req.body.cedula;
            guia.licencia = req.body.licencia;

            await guia.save();

            nuevoUsuario.guia = guia;
        }

        await nuevoUsuario.save();

        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("Data truncated for column 'rol'")) {
                return res.status(400).json({
                    message: 'El rol solo puede tomar los valores ADMIN, CLIENTE o GUIA.'
                });
            }
      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const updateUsuario = async (req: TypedRequest<{ id: string }, UserBody>, res: Response) => {
    const { id } = req.params;

    try {
        const usuarioEncontrado = await Usuario.findOneBy({ id: parseInt(id) });
        if (!usuarioEncontrado) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        if (req.body.password) {
            req.body.password = await createHash(req.body.password);
        }

        await Usuario.update({ id: parseInt(id) }, req.body);

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('invalid input value for enum')) {
                return res.status(400).json({
                    message: 'El rol solo puede tomar los valores ADMIN, CLIENTE o GUIA.'
                });
            }
      
            return res.status(500).json({
              message: error.message
            });
        }
    }
}

export const deleteUsuario = async (req: TypedRequest<{ id: string }, {}>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Usuario.delete({ id: parseInt(id) });

        if (result.affected === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
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