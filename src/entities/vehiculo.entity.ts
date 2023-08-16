import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm'
import { TIPO_VEHICULOS } from '../utils/vehiculos.enum';
import { Guia } from './guia.entity';
@Entity()
export class Vehiculo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    asientos: number
    @Column({
        type: 'enum',
        enum: TIPO_VEHICULOS
    })
    tipo: TIPO_VEHICULOS;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Guia,(guia) => guia.vehiculos)
    guia: Guia
}