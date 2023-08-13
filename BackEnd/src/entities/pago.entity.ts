import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToOne,JoinColumn} from 'typeorm'
import { Reservas } from './reservas.entity';

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

    @OneToOne(() => Reservas, reservas => reservas.pago)
    @JoinColumn()
    reservas: Reservas
}