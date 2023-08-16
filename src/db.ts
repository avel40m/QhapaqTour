import {DataSource} from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Guia } from './entities/guia.entity';
import { Vehiculo } from './entities/vehiculo.entity';
import { Reservas } from './entities/reservas.entity';
import { Calificacion } from './entities/calificacion.entity';
import { Lugar } from './entities/lugar.entity';
import { Pago } from './entities/pago.entity';
import { Recorrido } from './entities/recorrido.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'QhapaqTour',
    entities: [Usuario,Guia,Vehiculo,Reservas,Calificacion,Recorrido,Lugar,Pago]
});