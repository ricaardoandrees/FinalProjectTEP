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
    // return this.CoordinadorRepository.find();
    console.log('Obteniendo todas las Coordinadores desde el servicio...');
    return []; // Retorno de ejemplo
  }

  async findOne(id: string): Promise<Coordinador | null> { // ¡CORREGIDO: Puede devolver null!
    // Lógica para obtener una coordinador por ID
    console.log(`Obteniendo coordinador con ID: ${id} desde el servicio...`);
    return this.CoordinadorRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Coordinador: Coordinador): Promise<Coordinador> {
    // Lógica para crear una nueva coordinador
    // const newCoordinador = this.CoordinadorRepository.create(Coordinador);
    // return this.CoordinadorRepository.save(newCoordinador);
    console.log(`Creando nueva coordinador: ${JSON.stringify(Coordinador)} desde el servicio...`);
    return Coordinador; // Retorno de ejemplo
  }

  async update(id: string, Coordinador: Coordinador): Promise<Coordinador> {
    // Lógica para actualizar una coordinador existente
    // await this.CoordinadorRepository.update(id, Coordinador);
    // return this.CoordinadorRepository.findOne(id);
    console.log(`Actualizando coordinador con ID: ${id} y datos: ${JSON.stringify(Coordinador)} desde el servicio...`);
    return Coordinador; // Retorno de ejemplo
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una coordinador
    // await this.CoordinadorRepository.delete(id);
    console.log(`Eliminando coordinador con ID: ${id} desde el servicio...`);
  }
}