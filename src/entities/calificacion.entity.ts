import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm'
import { Usuario } from './usuario.entity';
import { Recorrido } from './recorrido.entity';

@Entity()
export class Calificacion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    comentario: string;
    
    @Column()
    nota: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Usuario, usuario => usuario.calificaciones)
    usuario: Usuario;

    @ManyToOne(() => Recorrido,recorrido => recorrido.calificaciones)
    recorrido: Recorrido
}