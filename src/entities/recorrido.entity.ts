import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne, OneToMany} from 'typeorm'
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

    @Column()
    duracion: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @Column()
    cantidadPersonas: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Guia, guia => guia.recorridos)
    guia: Guia;
    
    @ManyToOne(() => Lugar, lugar => lugar.recorridos)
    lugar: Lugar

    @OneToMany(() => Calificacion,calificacion => calificacion.recorrido,{cascade: true})
    calificaciones: Calificacion[]

    @OneToMany(() => Reservas, reservas => reservas.recorrido,{cascade: true})
    reservas: Reservas[];
}