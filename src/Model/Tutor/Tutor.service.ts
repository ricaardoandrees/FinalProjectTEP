// src/Tutor/Tutor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Tutor } from './Tutor.entity'; // Importa tu entidad Tutor

@Injectable()
export class TutorService {
  constructor(
  @InjectRepository(Tutor)
    private TutorRepository: Repository<Tutor>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Tutor[]> {
    // Lógica para obtener todas las Tutores (ej. desde la base de datos)
    // return this.TutorRepository.find();
    console.log('Obteniendo todas las Tutores desde el servicio...');
    return []; // Retorno de ejemplo
  }

  async findOne(id: string): Promise<Tutor | null> { // ¡CORREGIDO: Puede devolver null!
    // Lógica para obtener una Tutor por ID
    console.log(`Obteniendo Tutor con ID: ${id} desde el servicio...`);
    return this.TutorRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Tutor: Tutor): Promise<Tutor> {
    // Lógica para crear una nueva Tutor
    // const newTutor = this.TutorRepository.create(Tutor);
    // return this.TutorRepository.save(newTutor);
    console.log(`Creando nueva Tutor: ${JSON.stringify(Tutor)} desde el servicio...`);
    return Tutor; // Retorno de ejemplo
  }

  async update(id: string, Tutor: Tutor): Promise<Tutor> {
    // Lógica para actualizar una Tutor existente
    // await this.TutorRepository.update(id, Tutor);
    // return this.TutorRepository.findOne(id);
    console.log(`Actualizando Tutor con ID: ${id} y datos: ${JSON.stringify(Tutor)} desde el servicio...`);
    return Tutor; // Retorno de ejemplo
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Tutor
    // await this.TutorRepository.delete(id);
    console.log(`Eliminando Tutor con ID: ${id} desde el servicio...`);
  }
}