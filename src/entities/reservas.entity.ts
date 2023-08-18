import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,OneToOne,JoinColumn, OneToMany} from 'typeorm'
import { Guia } from './guia.entity';
import { Usuario } from './usuario.entity';
import { Pago } from './pago.entity';
import { Recorrido } from './recorrido.entity';

@Entity()
export class Reservas extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    personas: number;
    
    @Column()
    precio: number;

    @Column()
    fecha: Date;
    
    @Column()
    tiempoInicial: number;
    
    @Column()
    tiempoFinal: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.reservas)
    usuario: Usuario;

    @OneToMany(() => Pago, pago => pago.reservas)
    pago: Pago[];

    @ManyToOne(() => Recorrido, recorrido => recorrido.reservas)
    recorrido: Recorrido;
}