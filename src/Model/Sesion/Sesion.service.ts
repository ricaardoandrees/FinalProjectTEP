// src/Sesion/Sesion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository } from 'typeorm'; // Necesario si usas TypeORM
import { Sesion } from './Sesion.entity'; // Importa tu entidad Sesion

@Injectable()
export class SesionService {
  constructor(
  @InjectRepository(Sesion)
    private SesionRepository: Repository<Sesion>,
  ) {}
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Sesion[]> {
    // Lógica para obtener todas las Sesiones (ej. desde la base de datos)
   console.log('Obteniendo todas las Sesiones desde el servicio...');
    return this.SesionRepository.find();
  }

  async findOne(id: string): Promise<Sesion | null> { 
    // Lógica para obtener una Sesion por ID
   console.log(`Obteniendo Sesion con ID: ${id} desde el servicio...`);
    return this.SesionRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Sesion: Sesion): Promise<Sesion> {
    // Lógica para crear una nueva Sesion
    const newSesion = this.SesionRepository.create(Sesion);
    return this.SesionRepository.save(newSesion);
  }

  async update(id: string, Sesion: Sesion): Promise<Sesion | null> {
    // Lógica para actualizar una Sesion existente
    await this.SesionRepository.update(id, Sesion);
   console.log(`Actualizando Sesion con ID: ${id} y datos: ${JSON.stringify(Sesion)} desde el servicio...`);
    return this.SesionRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Sesion
    await this.SesionRepository.delete(id);
   console.log(`Eliminando Sesion con ID: ${id} desde el servicio...`);
  }


  async marcarSesionCompletada(tutorId: string, sesionId:string): Promise<Sesion| null > {
    console.log(`Marcando la sesion: ${sesionId} del tutor con ID: ${tutorId} como completada...`);
    const result = await this.SesionRepository.update(
      { 
        id:  parseInt(sesionId),
        tutor_id: { id: tutorId } as any
      },
      { completada: true }
    );
     if (result.affected && result.affected > 0) {
      return this.SesionRepository.findOne({ where: { id: parseInt(sesionId) } });
    }
    else{
      console.log(`No se encontró la sesión con ID: ${sesionId} para el tutor con ID: ${tutorId}`);
      return null;
    }
  }
}