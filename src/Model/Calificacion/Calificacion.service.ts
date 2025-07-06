// src/Calificacion/calificacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Calificacion } from './Calificacion.entity'; // Importa tu entidad Calificacion

@Injectable()
export class CalificacionService {
  constructor(
  @InjectRepository(Calificacion)
    private calificacionRepository: Repository<Calificacion>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Calificacion[]> {
    // Lógica para obtener todas las calificaciones (ej. desde la base de datos)
    // return this.calificacionRepository.find();
    console.log('Obteniendo todas las calificaciones desde el servicio...');
    return []; // Retorno de ejemplo
  }

  async findOne(id: string): Promise<Calificacion | null> { // ¡CORREGIDO: Puede devolver null!
    // Lógica para obtener una calificación por ID
    console.log(`Obteniendo calificación con ID: ${id} desde el servicio...`);
    return this.calificacionRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(calificacion: Calificacion): Promise<Calificacion> {
    // Lógica para crear una nueva calificación
    // const newCalificacion = this.calificacionRepository.create(calificacion);
    // return this.calificacionRepository.save(newCalificacion);
    console.log(`Creando nueva calificación: ${JSON.stringify(calificacion)} desde el servicio...`);
    return calificacion; // Retorno de ejemplo
  }

  async update(id: string, calificacion: Calificacion): Promise<Calificacion> {
    // Lógica para actualizar una calificación existente
    // await this.calificacionRepository.update(id, calificacion);
    // return this.calificacionRepository.findOne(id);
    console.log(`Actualizando calificación con ID: ${id} y datos: ${JSON.stringify(calificacion)} desde el servicio...`);
    return calificacion; // Retorno de ejemplo
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una calificación
    // await this.calificacionRepository.delete(id);
    console.log(`Eliminando calificación con ID: ${id} desde el servicio...`);
  }
}
