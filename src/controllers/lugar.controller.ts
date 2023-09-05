import { Request, Response } from 'express';
import { Lugar } from './../entities/lugar.entity';
import { REGION } from './../utils/region.enum';
import { Recorrido } from '../entities/recorrido.entity';
import path from 'path';
import { promises as fs } from 'fs'
import cloudinaryModule from 'cloudinary';
const cloudinary = cloudinaryModule.v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface LugarBody {
  nombre: string;
  latitud: string;
  longitud: string;
  localidad: string;
  region: REGION;
}


// Definición de las regiones y sus lugares
const regionesYlugares = {
  [REGION.PUNA]: [
    "ABRA PAMPA",
    "BARRANCAS (ABDÓN CASTRO TOLAY)",
    "SUSQUES",
    "CABRERIA",
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE ALFARCITO",
    "SAN JUAN Y OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",
  ],
  [REGION.QUEBRADA]: [
    "ABRA PAMPA",
    "BARRANCAS",
    "SUSQUES",
    "CABRERÍA",    
    "CASABINDO",
    "COCHINOCA",
    "CUSI CUSI",
    "EL MORENO",
    "LA QUIACA",
    "RINCONADA",
    "RINCONADILLAS",
    "SAN FRANCISCO DE AFARCITO",
    "SAN JUAN Y OROS",
    "SANTA CATALINA",
    "SANTUARIO DE TRES POZOS",
    "SAUSALITO",
    "YAVI",    
  ],
  [REGION.VALLES]: [
    "ANGOSTO DE JAIRO",
    "EL CARMEN",
    "SAN SALVADOR DE JUJUY",
    "YALA",
    "LOZANO",
    "OCLOYAS",
    "PALPALÁ",
    "PERICO",
    "SAN ANTONIO",
    "TIRAXI",
    "VILLA JARDIN DE REYES",
  ],
  [REGION.YUNGAS]: [
    "SAN FRANCISCO",
    "VILLAMONTE",
    "CALILEGUA",
    "ECOPORTAL DE PIEDRA",
    "LIBERTADOR GENERAL SAN MARTÍN",
    "PAMPICHUELA",
    "SAN PEDRO DE JUJUY",
    "VALLE GRANDE",
  ],
};

export const createLugar = async (req: Request, res: Response) => {
    try {
      const { nombre, latitud, longitud, localidad, region }: LugarBody = req.body;
      const file = req.file;
      
      if (!file) {        
        return res.status(404).json({message: "No envio imagen"})
      }

      // console.log({ 
      //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      //   api_key: process.env.CLOUDINARY_API_KEY, 
      //   api_secret: process.env.CLOUDINARY_API_SECRET
      // })
      const result = await cloudinary.uploader.upload(file.path);
      if (!result) {
        return res.status(404).json({message:"no se pudo guardar la imagen en cloudinary"});
      }
      const lugar = new Lugar();
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.localidad = localidad;
      lugar.region = region;
      lugar.url = result.url;
      lugar.publicId = result.public_id;

      await lugar.save();
      await fs.unlink(file.path)
      
      return res.json(lugar);
      // return res.json('subida');
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugares = async (req: Request, res: Response) => {
    try {
      const lugares = await Lugar.find();
      return res.json(lugares);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
  export const getLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;      
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
      if (!lugar) return res.status(404).json({ message: "Lugar no encontrado" });
  
      return res.json(lugar);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
};


export const updateLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const lugar = await Lugar.findOneBy({ id: parseInt(id) });
  
      if (!lugar) return res.status(404).json({ message: "Lugar no encontrado" });
  
      // Actualizar los datos del lugar según el cuerpo de la solicitud
      const { nombre, latitud, longitud, localidad, region }: LugarBody = req.body;
      lugar.nombre = nombre;
      lugar.latitud = latitud;
      lugar.longitud = longitud;
      lugar.localidad = localidad;
      lugar.region = region;

      if (file) {
        await cloudinary.uploader.destroy(lugar.publicId)
        const result = await cloudinary.uploader.upload(file.path)
        lugar.url = result.url;
        lugar.publicId = result.public_id
  
        await fs.unlink(file.path)
      }
  
      // No es necesario actualizar los recorridos ya que no estamos creando nuevos recorridos aquí
  
      await lugar.save();
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  


  export const deleteLugar = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const lugar = await Lugar.findOneBy({ id: parseInt(id) });

      if (!lugar) {
        return res.status(404).json({ message: "Lugar no encontrado" });
      }
      await cloudinary.uploader.destroy(lugar.publicId);
      await Lugar.delete(id);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const getImages = async (req:Request,res:Response) => {
    try {
      const { idImage } = req.params;
      const lugar:Lugar = await Lugar.findOneOrFail({where: {id: Number(idImage)}});
      if(!lugar)
        return res.status(404).json({message: "Imagen no encontrada"});
     
      const imagePath = path.join(__dirname , '../images/', lugar.url);
      res.sendFile(imagePath);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      }
    }
  }