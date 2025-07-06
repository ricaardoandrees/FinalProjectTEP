import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Materia } from '../Materia/Materia.entity';
import { Tutor } from '../Tutor/Tutor.entity';

@Entity({ name: 'solicitud' })
export class Solicitud {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Estudiante, { nullable: false })
    @JoinColumn({ name: 'estudiante_id' })
    estudiante: Estudiante;

    @ManyToOne(() => Materia, { nullable: false })
    @JoinColumn({ name: 'materia_id' })
    materia: Materia;

    @Column({ name: 'fecha_solicitada', type: 'date' })
    fechaSolicitada: string;

    @Column({ name: 'hora_solicitada', type: 'time' })
    horaSolicitada: string;

    @Column({ length: 20 })
    estado: string;

    @ManyToOne(() => Tutor, { nullable: true })
    @JoinColumn({ name: 'tutor_id' })
    tutor?: Tutor;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;
}