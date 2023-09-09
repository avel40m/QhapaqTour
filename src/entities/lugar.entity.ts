import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm'
import { REGION } from '../utils/region.enum';
import { Recorrido } from './recorrido.entity';

@Entity()
export class Lugar extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
    
    @Column()
    localidad: string;
    
    @Column()
    latitud: string;
    
    @Column()
    longitud: string;
    
    @Column({
        type: 'enum',
        enum: REGION
    })
    region: REGION;
    
    @Column()
    url: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Recorrido, recorrido => recorrido.lugar,{cascade: true})
    recorridos: Recorrido[];
}