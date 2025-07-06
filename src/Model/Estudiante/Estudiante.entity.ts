import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';

@Entity({ name: 'estudiante' })
export class Estudiante {
    // Usamos el mismo id de Usuario como PK y FK
    @PrimaryColumn()
    id: number;

    @Column({ length: 20, unique: true })
    cedula: string;

    @Column({ length: 100, nullable: true })
    carrera: string;

    @Column({ type: 'int', nullable: true })
    semestre: number;

    @Column({ length: 20, nullable: true })
    telefono: string;

    // Relación 1:1 con Usuario, usando la columna 'id'
    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id' })
    usuario: Usuario;
}