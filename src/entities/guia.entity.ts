import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToOne,OneToMany} from 'typeorm'
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
    usuario: Usuario;

    @OneToMany(() => Vehiculo,(vehiculo) => vehiculo.guia,{cascade: true})
    vehiculos: Vehiculo[]
    
    @OneToMany(() => Recorrido, (recorrido) => recorrido.guia,{cascade: true})
    recorridos: Recorrido[]
}