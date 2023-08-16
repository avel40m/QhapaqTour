import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToOne,JoinColumn,OneToMany} from 'typeorm'
import { Usuario } from './usuario.entity';
import { Vehiculo } from './vehiculo.entity';
import { Recorrido } from './recorrido.entity';

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
    // @JoinColumn()
    usuario: Usuario;
    
    @OneToMany(() => Vehiculo, vehiculo => vehiculo.guia)
    vehiculos: Vehiculo[];
    
    @OneToMany(() => Recorrido, (recorrido) => recorrido.guia)
    // @JoinColumn()
    recorridos: Recorrido[]
}