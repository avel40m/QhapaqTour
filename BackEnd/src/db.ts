import {DataSource} from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Guia } from './entities/guia.entity';
import { Vehiculo } from './entities/vehiculo.entity';
import { Reservas } from './entities/reservas.entity';
import { Clasificacion } from './entities/clasificacion.entity';
import { Lugar } from './entities/lugar.entity';
import { Pago } from './entities/pago.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'QhapaqTour',
    synchronize: true,
    entities: [Usuario,Guia,Vehiculo,Reservas,Clasificacion,Lugar,Pago]
});