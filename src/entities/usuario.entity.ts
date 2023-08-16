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

    @Column()
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

<<<<<<< HEAD
    @OneToOne(() => Guia,(guia) => guia.usuario)
    // @JoinColumn()
=======
    // @OneToOne(() => Guia,(guia) => guia.usuario)
    @OneToOne(() => Guia)
    @JoinColumn()
>>>>>>> cece4c7b370d464c5429e1d968a4fe0e9892f55b
    guia: Guia

    @OneToMany(() => Reservas, reservas => reservas.usuario)
    // @JoinColumn()
    reservas: Reservas[]

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario)
    // @JoinColumn()
<<<<<<< HEAD
    calificacion: Calificacion[];

    @OneToMany(() => Pago, pago => pago.usuario)
    // @JoinColumn()
    pago: Pago[];
=======
    calificaciones: Calificacion[];

    @OneToMany(() => Pago, pago => pago.usuario)
    // @JoinColumn()
    pagos: Pago[];
>>>>>>> cece4c7b370d464c5429e1d968a4fe0e9892f55b
}