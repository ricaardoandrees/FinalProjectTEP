import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Materia' })
export class Materia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 20, unique: true })
    codigo: string;
}