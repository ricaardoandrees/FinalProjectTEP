// src/Estudiante/Estudiante.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Estudiante } from './Estudiante.entity'; // Importa tu entidad Estudiante

@Injectable()
export class EstudianteService {
  constructor(
  @InjectRepository(Estudiante)
    private EstudianteRepository: Repository<Estudiante>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Estudiante[]> {
    // Lógica para obtener todas las Estudiantees (ej. desde la base de datos)
    console.log('Obteniendo todas las Estudiantees desde el servicio...');
    return this.EstudianteRepository.find();
  }

  async findOne(id: string): Promise<Estudiante | null> { 
    // Lógica para obtener una Estudiante por ID
    console.log(`Obteniendo Estudiante con ID: ${id} desde el servicio...`);
    return this.EstudianteRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Estudiante: Estudiante): Promise<Estudiante> {
    // Lógica para crear una nueva Estudiante
    const newEstudiante = this.EstudianteRepository.create(Estudiante);
    return this.EstudianteRepository.save(newEstudiante);
  }

  async update(id: string, Estudiante: Estudiante): Promise<Estudiante | null> {
    // Lógica para actualizar una Estudiante existente
    await this.EstudianteRepository.update(id, Estudiante);
    console.log(`Actualizando Estudiante con ID: ${id} y datos: ${JSON.stringify(Estudiante)} desde el servicio...`);
    return this.EstudianteRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Estudiante
    await this.EstudianteRepository.delete(id);
    console.log(`Eliminando Estudiante con ID: ${id} desde el servicio...`);
  }
}