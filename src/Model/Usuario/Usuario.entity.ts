import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 100, unique: true })
    correo: string;

    // Mapeamos la columna SQL "contraseña" a la propiedad TS "contrasena"
    @Column({ name: 'contraseña', length: 255 })
    contrasena: string;

    @Column({ default: true })
    activo: boolean;

    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion: Date;
}