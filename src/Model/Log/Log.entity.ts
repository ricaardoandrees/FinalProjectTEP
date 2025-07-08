import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';

@Entity({ name: 'log' })
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    // Relación correcta: no @Column, sí @JoinColumn
    @ManyToOne(() => Usuario, { nullable: true, eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario_id: Usuario;

    @Column({ length: 100 })
    accion: string;

    @Column({ length: 100, nullable: true })
    ruta?: string;

    @Column({ length: 10, nullable: true })
    metodo?: string;

    @CreateDateColumn({ name: 'timestamp', type: 'timestamp' })
    timestamp: Date;
}