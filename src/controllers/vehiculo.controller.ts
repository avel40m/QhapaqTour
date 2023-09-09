import { Request, Response } from 'express';
import { Vehiculo } from './../entities/vehiculo.entity'; // Ajusta la ruta hacia tu entidad Vehiculo
import { TIPO_VEHICULOS } from './../utils/vehiculos.enum'; // Ajusta la ruta hacia tu enum
import { Guia } from './../entities/guia.entity'; //guia
import { Usuario } from '../entities/usuario.entity';

interface VehiculoBody {
  asientos: number;
  tipo: TIPO_VEHICULOS;
  guiaId: number; // Supongo que esta es la forma en que vinculas un vehículo con una guía
}


//el metodo para crear el vehiculo
export const createVehiculo = async (req: Request, res: Response) => {
  try {
    const { asientos, tipo }: VehiculoBody = req.body;
    const guiaId = req.idUser;

    const vehiculo = new Vehiculo();
    vehiculo.asientos = asientos;
    vehiculo.tipo = tipo;

    const guia = await Guia.findOneBy({ id: guiaId });

//    const guia = await Guia.findOne(guiaId);
    if (!guia) return res.status(404).json({ message: "Guia not found" });

    vehiculo.guia = guia;

    await vehiculo.save();
    return res.json(vehiculo);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Data truncated for column 'tipo'")) {
        return res.status(400).json({
            message: 'El tipo solo puede tomar los valores MOTO, AUTO, CAMIONETA, COLECTIVO, VAN, TRAFIC y MINIBUS.'
        });
      }
      
      return res.status(500).json({ message: error.message });
    }
  }
};

//trae todos los elementos
export const getVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculos = await Vehiculo.find();
    return res.json(vehiculos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//traer un objeto
export const getVehiculo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const vehiculo = await Vehiculo.findOneBy({ id: parseInt(id) });

    if (!vehiculo) return res.status(404).json({ message: "Vehiculo not found" });

    return res.json(vehiculo);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//modifica los datos de vehiculo con el id
export const updateVehiculo = async (req: Request, res: Response) => {
    const guiaId = req.idUser;
  
    try {
      const usuario = await Usuario.findOne({where: {id: Number(guiaId)}});
      // await Vehiculo.update({id: usuario.id},req.body);
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Data truncated for column 'tipo'")) {
          return res.status(400).json({
              message: 'El tipo solo puede tomar los valores AUTOMOVIL, CAMIONETA y MOTOCICLETA.'
          });
        }

        return res.status(500).json({ message: error.message });
      }
    }
  };

  //elimina vehiculo con el id
export const deleteVehiculo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const result = await Vehiculo.delete({ id: parseInt(id) });


    if (result.affected === 0)
      return res.status(404).json({ message: "Vehiculo not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
/**pedir ayuda por el tema de guia */

export const createVehiculoForGuia = async (req:Request,res:Response) => {
  const usuarioId = req.idUser;
  try {
    const usuario = await Usuario.findOne({where: {id: usuarioId},relations: ['guia']});
    if (usuario?.guia == null) {
      return res.status(404).json({message:"Primero complete su dato de guia"})
    }
    const guia = await Guia.findOne({where: {id: usuario.guia.id},relations: ['vehiculos']})
    const vehiculo = new Vehiculo();
    vehiculo.asientos = req.body.asientos;
    vehiculo.tipo = req.body.tipo;
    await vehiculo.save();
    
    guia?.vehiculos.push(vehiculo);
    await guia?.save();

    return res.status(201).json({message:"Se guardo el vehiculo correctamente"})
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}