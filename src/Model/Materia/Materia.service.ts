// src/Materia/Materia.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Materia } from './Materia.entity'; // Importa tu entidad Materia

@Injectable()
export class MateriaService {
  constructor(
  @InjectRepository(Materia)
    private MateriaRepository: Repository<Materia>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Materia[]> {
    // Lógica para obtener todas las Materiaes (ej. desde la base de datos)
   console.log('Obteniendo todas las Materiaes desde el servicio...');
    return this.MateriaRepository.find();
  }

  async findOne(id: string): Promise<Materia | null> { 
    // Lógica para obtener una Materia por ID
   console.log(`Obteniendo Materia con ID: ${id} desde el servicio...`);
    return this.MateriaRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Materia: Materia): Promise<Materia> {
    // Lógica para crear una nueva Materia
    const newMateria = this.MateriaRepository.create(Materia);
    return this.MateriaRepository.save(newMateria);
  }

  async update(id: string, Materia: Materia): Promise<Materia | null> {
    // Lógica para actualizar una Materia existente
    await this.MateriaRepository.update(id, Materia);
   console.log(`Actualizando Materia con ID: ${id} y datos: ${JSON.stringify(Materia)} desde el servicio...`);
    return this.MateriaRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Materia
    await this.MateriaRepository.delete(id);
   console.log(`Eliminando Materia con ID: ${id} desde el servicio...`);
  }
}