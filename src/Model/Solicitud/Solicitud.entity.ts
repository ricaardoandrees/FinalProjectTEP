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

    @ManyToOne(() => Estudiante, { nullable: false , eager: true})
    @JoinColumn({ name: 'estudiante_id' })
    estudiante_id: Estudiante;

    @ManyToOne(() => Materia, { nullable: false , eager: true})
    @JoinColumn({ name: 'materia_id' })
    materia_id: Materia;

    @Column({ name: 'fecha_solicitada', type: 'date' })
    fecha_solicitada: string;

    @Column({ name: 'hora_solicitada', type: 'time' })
    hora_solicitada: string;

    @Column({ length: 20 })
    estado: string;

    @ManyToOne(() => Tutor, { nullable: true , eager: true})
    @JoinColumn({ name: 'tutor_id' })
    tutor_id?: Tutor;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fecha_creacion: Date;
}