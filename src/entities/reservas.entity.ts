import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne,OneToOne, JoinColumn} from 'typeorm'
import { Guia } from './guia.entity';
import { Usuario } from './usuario.entity';
import { Pago } from './pago.entity';
import { Recorrido } from './recorrido.entity';

@Entity()
export class Reservas extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidadPersonas: number;
    
    @Column()
    precio: number;

    @Column()
    fecha: Date;
    
    // @Column()
    // tiempoInicial: number;
    
    // @Column()
    // tiempoFinal: number;
    
    @Column()
    fechaHora: Date;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.reservas)
    usuario: Usuario;

    @OneToOne(() => Pago)
    @JoinColumn()
    pago: Pago;

    @ManyToOne(() => Recorrido, recorrido => recorrido.reservas)
    recorrido: Recorrido;
}