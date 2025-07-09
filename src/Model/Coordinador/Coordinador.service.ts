// src/Coordinador/Coordinador.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coordinador } from './Coordinador.entity';
import { Tutor } from '../Tutor/Tutor.entity';
import { Materia } from '../Materia/Materia.entity';
import { AssignTutorDto } from './dto/assign-tutor.dto';

@Injectable()
export class CoordinadorService {
  constructor(
    @InjectRepository(Coordinador)
    private CoordinadorRepository: Repository<Coordinador>,
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
    @InjectRepository(Materia)
    private materiaRepository: Repository<Materia>,
  ) {}

  async assignTutorToMateria(assignTutorDto: AssignTutorDto): Promise<Tutor> {
    const { tutorId, materiaId } = assignTutorDto;

    const tutor = await this.tutorRepository.findOne({ where: { id: tutorId } });
    if (!tutor) {
      throw new NotFoundException(`Tutor con ID ${tutorId} no encontrado.`);
    }

    const materia = await this.materiaRepository.findOne({ where: { id: materiaId } });
    if (!materia) {
      throw new NotFoundException(`Materia con ID ${materiaId} no encontrada.`);
    }

    tutor.materia_id = materia;
    return this.tutorRepository.save(tutor);
  }

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