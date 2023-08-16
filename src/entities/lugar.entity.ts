import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany, JoinColumn} from 'typeorm'
import { REGIONES } from '../utils/regiones.enum';
import { Recorrido } from './recorrido.entity';

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

    @OneToMany(() => Recorrido, recorrido => recorrido.lugar)
    recorridos: Recorrido[];
}