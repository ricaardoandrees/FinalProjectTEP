import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Sesion } from '../Sesion/Sesion.entity';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Tutor } from '../Tutor/Tutor.entity';

@Entity({ name: 'calificacion' })
export class Calificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Sesion, { nullable: false , eager: true  })
    @JoinColumn({ name: 'sesion_id' })
    sesion_id: Sesion;

    @ManyToOne(() => Estudiante, { nullable: false  , eager: true })
    @JoinColumn({ name: 'estudiante_id' })
    estudiante_id: Estudiante;

    @ManyToOne(() => Tutor, { nullable: false , eager: true  })
    @JoinColumn({ name: 'tutor_id' })
    tutor_id: Tutor;

    @Column({ type: 'int', nullable: false, comment: '1 a 5' })
    calificacion: number;

    @Column({ type: 'text', nullable: true })
    comentario?: string;

    @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
    fecha: Date;
}