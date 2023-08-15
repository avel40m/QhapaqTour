import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToOne,JoinColumn, ManyToOne} from 'typeorm'
import { Reservas } from './reservas.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Pago extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    total: number;
    @Column()
    metodoPago: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.pago)
    usuario: Usuario;
    
    @ManyToOne(() => Reservas, reservas => reservas.pago)
    reservas: Reservas;
}