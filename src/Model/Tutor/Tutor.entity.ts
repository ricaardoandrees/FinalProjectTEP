import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';
import { Materia } from '../Materia/Materia.entity';

@Entity({ name: 'tutor' })
export class Tutor {
    // Usamos el mismo id de Usuario como PK y FK
    @PrimaryColumn()
    id: number;

    @Column({ length: 20, unique: true })
    cedula: string;

    @Column({ length: 100, nullable: true })
    profesion: string;

    @Column({ type: 'text', nullable: true })
    experiencia: string;

    @Column({ length: 20, nullable: true })
    telefono: string;

    // Relación 1:1 con Usuario
    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id' })
    usuario: Usuario;

    // Relación N:1 con Materia
    @ManyToOne(() => Materia, { nullable: true })
    @JoinColumn({ name: 'materia_id' })
    materia_id: Materia;
}