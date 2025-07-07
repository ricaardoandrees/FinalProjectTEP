// src/Coordinador/Coordinador.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Coordinador } from './Coordinador.entity'; // Importa tu entidad Coordinador

@Injectable()
export class CoordinadorService {
  constructor(
  @InjectRepository(Coordinador)
    private CoordinadorRepository: Repository<Coordinador>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Coordinador[]> {
    // Lógica para obtener todas las Coordinadores (ej. desde la base de datos)
    console.log('Obteniendo todas las Coordinadores desde el servicio...');
    return this.CoordinadorRepository.find();
  }

  async findOne(id: string): Promise<Coordinador | null> { 
    // Lógica para obtener una Coordinador por ID
    console.log(`Obteniendo Coordinador con ID: ${id} desde el servicio...`);
    return this.CoordinadorRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Coordinador: Coordinador): Promise<Coordinador> {
    // Lógica para crear una nueva Coordinador
    const newCoordinador = this.CoordinadorRepository.create(Coordinador);
    return this.CoordinadorRepository.save(newCoordinador);
  }

  async update(id: string, Coordinador: Coordinador): Promise<Coordinador | null> {
    // Lógica para actualizar una Coordinador existente
    await this.CoordinadorRepository.update(id, Coordinador);
    console.log(`Actualizando Coordinador con ID: ${id} y datos: ${JSON.stringify(Coordinador)} desde el servicio...`);
    return this.CoordinadorRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Coordinador
    await this.CoordinadorRepository.delete(id);
    console.log(`Eliminando Coordinador con ID: ${id} desde el servicio...`);
  }
}