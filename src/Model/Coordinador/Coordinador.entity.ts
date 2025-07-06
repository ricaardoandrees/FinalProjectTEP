import {
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from '../Usuario/Usuario.entity';

@Entity({ name: 'coordinador' })
export class Coordinador {
    // Usamos el mismo id de Usuario como PK y FK
    @PrimaryColumn()
    id: number;

    @Column({ length: 20, unique: true })
    cedula: string;

    @Column({ length: 100, nullable: true })
    departamento: string;

    @Column({ name: 'extension_interna', length: 20, nullable: true })
    extensionInterna: string;

    // Relación 1:1 con Usuario
    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id' })
    usuario: Usuario;
}