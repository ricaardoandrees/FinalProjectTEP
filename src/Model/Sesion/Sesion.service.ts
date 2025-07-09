// src/Sesion/Sesion.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Necesario si usas TypeORM
import { Repository,Raw  } from 'typeorm'; // Necesario si usas TypeORM
import { Sesion } from './Sesion.entity'; // Importa tu entidad Sesion
import { Tutor } from '../Tutor/Tutor.entity'; // Importa tu entidad Tutor si la necesitas
import { Materia } from '../Materia/Materia.entity'; // Importa tu entidad Materia si la necesitas
import { Usuario } from '../Usuario/Usuario.entity';

@Injectable()
export class SesionService {
  constructor(
  @InjectRepository(Sesion)
    private SesionRepository: Repository<Sesion>,
    @InjectRepository(Tutor) 
    private TutorRepository: Repository<Tutor>,
    @InjectRepository(Materia) 
    private MateriaRepository: Repository<Materia>,
    @InjectRepository(Materia) 
    private UsuarioRepository: Repository<Usuario>
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

  async filtarSesionesPorTutor(tutorId: string): Promise<Sesion[]> {
    if (!tutorId || isNaN(parseInt(tutorId))) {
      throw new BadRequestException('ID de tutor inválido proporcionado.');
    }
    console.log(`Filtrando sesiones por tutor con ID: ${tutorId}...`);
    const result= await this.SesionRepository.find({
      where: { tutor_id: { id: parseInt(tutorId) } }, 
    });
    if (result && result.length > 0) {
      return result;
    } else {
      console.log(`No se encontraron sesiones para el tutor con ID: ${tutorId}`);
      throw new BadRequestException(`No se encontraron sesiones para el tutor con ID: ${tutorId}`);
    }
  }

  async filtarSesionesPorMateria(materiaId: string): Promise<Sesion[]> {
    if (!materiaId || isNaN(parseInt(materiaId))) {
      throw new BadRequestException('ID de materia inválido proporcionado.');
    }
    console.log(`Filtrando sesiones por la materia con ID: ${materiaId}...`);
    const result= await this.SesionRepository.find({
      where: { materia_id: { id: parseInt(materiaId) } }, 
    });
    if (result && result.length > 0) {
      return result;
    } else {
      console.log(`No se encontraron sesiones para la materia con ID: ${materiaId}`);
      throw new BadRequestException(`No se encontraron sesiones para la materia con ID: ${materiaId}`);
    }
  }
  
  async filtarSesionesPorFecha(fechaActual: Date): Promise<Sesion[]> {
    console.log(`Filtrando sesiones por aquellas del dia: ${fechaActual}...`);
    if (!fechaActual || !(fechaActual instanceof Date)) {
      throw new BadRequestException('Fecha inválida proporcionada.');
    }
    const formattedDate = fechaActual.toISOString().split('T')[0];
    const result= await this.SesionRepository.find({
      where: { fecha: Raw(alias => `DATE(${alias}) = :date`, { date: formattedDate }),}, 
    });
    if (result && result.length > 0) {
      return result;
    } else {
      console.log(`No se encontraron sesiones para el día: ${formattedDate}`);
      throw new BadRequestException(`No se encontraron sesiones para el día: ${formattedDate}`);
    }
  }

  async filtarSesionesPorEstado(estado: boolean): Promise<Sesion[]> {
    if (typeof estado !== 'boolean') {
      throw new BadRequestException('ID de materia inválido proporcionado.');
    }
    let respuesta;
    if (estado === true)
      respuesta='completadas';
    else
      respuesta='no completadas';

    console.log(`Filtrando sesiones por aquellas ${respuesta}...`);
    const result= await this.SesionRepository.find({
      where: { completada: estado }, 
    });
    if (result && result.length > 0) {
      return result;
    } else {
      console.log(`No se encontraron sesiones : ${respuesta}`);
      throw new BadRequestException(`No se encontraron sesiones: ${respuesta}`);
    }
  }

  async getCantidadSesionesPorTodosLosTutores(): Promise<{ tutorId: number; tutorNombre: string; cantidad: number }[]> {
    console.log('Calculando la cantidad de sesiones por cada tutor (incluyendo nombre de usuario)...');

    const result = await this.SesionRepository.createQueryBuilder('sesion')
      .leftJoin('sesion.tutor_id', 'tutor') 
      .leftJoin('tutor.usuario', 'usuario') 
      .select('tutor.id', 'tutorId') 
      .addSelect('usuario.nombre', 'tutorNombre') 
      .addSelect('COUNT(sesion.id)', 'cantidad') 
      .groupBy('tutor.id') 
      .addGroupBy('usuario.nombre') 
      .getRawMany();

    const resultadoFormateado = result.map(row => ({
      tutorId: parseInt(row.tutorId),
      tutorNombre: row.tutorNombre,
      cantidad: parseInt(row.cantidad),
    }));

    console.log('Estadísticas de sesiones por tutor (con nombre de usuario) calculadas:', resultadoFormateado);
    return resultadoFormateado;
  }
  async getCantidadSesionesPorTodasLasMaterias(): Promise<{ materiaId: number; materiaNombre: string; cantidad: number }[]> {
    console.log('Calculando la cantidad de sesiones por cada materia (incluyendo nombre)...');

    const result = await this.SesionRepository.createQueryBuilder('sesion')
      .leftJoin('sesion.materia_id', 'materia') 
      .select('materia.id', 'materiaId') 
      .addSelect('materia.nombre', 'materiaNombre') 
      .addSelect('COUNT(sesion.id)', 'cantidad') 
      .groupBy('materia.id')
      .addGroupBy('materia.nombre') 
      .getRawMany();

    const resultadoFormateado = result.map(row => ({
      materiaId: parseInt(row.materiaId),
      materiaNombre: row.materiaNombre, 
      cantidad: parseInt(row.cantidad),
    }));

    console.log('Estadísticas de sesiones por materia (con nombre) calculadas:', resultadoFormateado);
    return resultadoFormateado;
  }

}