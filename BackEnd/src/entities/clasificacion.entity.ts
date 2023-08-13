import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn,ManyToOne} from 'typeorm'
import { Lugar } from './lugar.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Clasificacion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    comentario: string;
    @Column()
    fecha: Date;
    @Column()
    note: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Lugar, lugar => lugar.calificacion)
    lugar: Lugar;

    @ManyToOne(() => Usuario, usuario => usuario.clasificacion)
    usuario: Usuario;
}