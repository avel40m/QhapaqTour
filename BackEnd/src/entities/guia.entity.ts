import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToOne,JoinColumn,OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Usuario } from './usuario.entity';
import { Vehiculo } from './vehiculo.entity';
import { Lugar } from './lugar.entity';
import { Reservas } from './reservas.entity';

@Entity()
export class Guia extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    carnet: string;
    @Column()
    licencia: number;
    @Column()
    cedula: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToOne(() => Usuario, (usuario) => usuario.guia)
    @JoinColumn()
    usuario: Usuario;

    @OneToMany(() => Vehiculo,(vehiculo) => vehiculo.guia)
    vehiculo: Vehiculo[]

    @OneToMany(() => Reservas, reservas => reservas.guia)
    reservas: Reservas[];

    @ManyToMany(() => Lugar, lugar => lugar.guia)
    @JoinTable()
    lugar: Lugar[]
}