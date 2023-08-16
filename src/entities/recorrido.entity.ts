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

    @ManyToOne(() => Guia, guia => guia.recorridos)
    guia: Guia;
    @ManyToOne(() => Lugar, lugar => lugar.recorridos)
    lugar: Lugar

    @OneToMany(() => Calificacion,calificacion => calificacion.recorrido)
    // @JoinColumn()
    calificaciones: Calificacion[]

    @OneToMany(() => Reservas, reservas => reservas.recorrido)
    // @JoinColumn()
    reservas: Reservas[];
}