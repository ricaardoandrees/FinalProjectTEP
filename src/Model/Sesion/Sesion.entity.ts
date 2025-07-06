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
    solicitud_id: Solicitud;

    @ManyToOne(() => Tutor, { nullable: false , eager: true })
    @JoinColumn({ name: 'tutor_id' })
    tutor_id: Tutor;

    @ManyToOne(() => Estudiante, { nullable: false, eager: true})
    @JoinColumn({ name: 'estudiante_id' })
    estudiante_id: Estudiante;

    @ManyToOne(() => Materia, { nullable: false , eager: true})
    @JoinColumn({ name: 'materia_id' })
    materia_id: Materia;

    @Column({ type: 'date' })
    fecha: string;

    @Column({ type: 'time' })
    hora: string;

    @Column({ default: false })
    completada: boolean;
}