import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany, JoinColumn} from 'typeorm'
import { Lugar } from './lugar.entity';
import { Guia } from './guia.entity';
import { Calificacion } from './calificacion.entity';
import { Reservas } from './reservas.entity';

@Entity()
export class Recorrido extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    precio: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Guia, guia => guia.recorrido)
    guia: Guia;
    @ManyToOne(() => Lugar, lugar => lugar.recorrido)
    lugar: Lugar

    @OneToMany(() => Calificacion,calificacion => calificacion.recorrido)
    // @JoinColumn()
    calificaciones: Calificacion[]
    // @JoinColumn()
    calificacion: Calificacion[]

    @OneToMany(() => Reservas, reservas => reservas.recorrido)
    // @JoinColumn()
    reservas: Reservas[];
}