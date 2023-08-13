import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToMany,OneToMany} from 'typeorm'
import { Guia } from './guia.entity';
import { REGIONES } from '../utils/regiones.enum';
import { Clasificacion } from './clasificacion.entity';

@Entity()
export class Lugar extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    latitud: string;
    @Column()
    longitud: string;
    @Column()
    precio: number;
    @Column({
        type: 'enum',
        enum: REGIONES
    })
    regiones: REGIONES;
    @Column()
    url: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Guia, guia => guia.lugar)
    guia: Guia[]

    @OneToMany(() => Clasificacion, clasificacion => clasificacion.usuario)
    calificacion: Clasificacion[];
}