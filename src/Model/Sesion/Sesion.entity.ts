import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Solicitud } from '../Solicitud/Solicitud.entity';
import { Tutor } from '../Tutor/Tutor.entity';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Materia } from '../Materia/Materia.entity';

@Entity({ name: 'sesion' })
export class Sesion {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Solicitud)
    @JoinColumn({ name: 'solicitud_id' })
    solicitud: Solicitud;

    @ManyToOne(() => Tutor, { nullable: false })
    @JoinColumn({ name: 'tutor_id' })
    tutor: Tutor;

    @ManyToOne(() => Estudiante, { nullable: false })
    @JoinColumn({ name: 'estudiante_id' })
    estudiante: Estudiante;

    @ManyToOne(() => Materia, { nullable: false })
    @JoinColumn({ name: 'materia_id' })
    materia: Materia;

    @Column({ type: 'date' })
    fecha: string;

    @Column({ type: 'time' })
    hora: string;

    @Column({ default: false })
    completada: boolean;
}