import {BaseEntity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,Entity,OneToOne,OneToMany,JoinColumn} from 'typeorm'
import { ROL } from '../utils/rol.enum';
import { Guia } from './guia.entity';
import { Reservas } from './reservas.entity';
import { Calificacion } from './calificacion.entity';
import { Pago } from './pago.entity';

@Entity()
export class Usuario extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false })
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @Column()
    apellido: string;

    @Column()
    nombre: string;

    @Column()
    dni: string;

    @Column({
        type: 'enum',
        enum: ROL
    })
    rol: ROL;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Guia)
    @JoinColumn()
    guia: Guia

    @OneToMany(() => Reservas, reservas => reservas.usuario,{cascade: true})
    reservas: Reservas[]

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario,{cascade: true})
    calificaciones: Calificacion[];

    @OneToMany(() => Pago, pago => pago.usuario,{cascade: true})
    pagos: Pago[];
}