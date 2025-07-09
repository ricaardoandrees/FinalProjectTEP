import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Coordinador } from '../Coordinador/Coordinador.entity';
import { Estudiante } from '../Estudiante/Estudiante.entity';
import { Tutor } from '../Tutor/Tutor.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private entityManager: EntityManager,
  ) {}

  async getProfile(userId: number): Promise<any> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    const coordinador = await this.entityManager.findOne(Coordinador, { where: { id: userId } });
    if (coordinador) {
      return { ...usuario, rol: 'coordinador', ...coordinador };
    }

    const estudiante = await this.entityManager.findOne(Estudiante, { where: { id: userId } });
    if (estudiante) {
      return { ...usuario, rol: 'estudiante', ...estudiante };
    }

    const tutor = await this.entityManager.findOne(Tutor, { where: { id: userId } });
    if (tutor) {
      return { ...usuario, rol: 'tutor', ...tutor };
    }

    return usuario; // Should not happen if every user has a role
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    if (updateProfileDto.nombre) {
      usuario.nombre = updateProfileDto.nombre;
    }
    if (updateProfileDto.contrasena) {
      usuario.contrasena = updateProfileDto.contrasena; // Remember to hash this
    }

    return this.usuarioRepository.save(usuario);
  }
 
  // Ejemplo de métodos CRUD básicos:

  async findAll(): Promise<Usuario[]> {
    // Lógica para obtener todas las Usuarioes (ej. desde la base de datos)
    console.log('Obteniendo todas las Usuarioes desde el servicio...');
    return this.usuarioRepository.find();
  }

  async findOne(id: string): Promise<Usuario | null> { 
    // Lógica para obtener una Usuario por ID
    console.log(`Obteniendo Usuario con ID: ${id} desde el servicio...`);
    return this.usuarioRepository.findOne({ where: { id: parseInt(id) } }); // Agregado 'where' y parseo de ID si es numérico
  }

  async create(Usuario: Usuario): Promise<Usuario> {
    // Lógica para crear una nueva Usuario
    const newUsuario = this.usuarioRepository.create(Usuario);
    return this.usuarioRepository.save(newUsuario);
  }

  async update(id: string, Usuario: Usuario): Promise<Usuario | null> {
    // Lógica para actualizar una Usuario existente
    await this.usuarioRepository.update(id, Usuario);
    console.log(`Actualizando Usuario con ID: ${id} y datos: ${JSON.stringify(Usuario)} desde el servicio...`);
    return this.usuarioRepository.findOne({ where: { id: parseInt(id) }} );
  }

  async remove(id: string): Promise<void> {
    // Lógica para eliminar una Usuario
    await this.usuarioRepository.delete(id);
    console.log(`Eliminando Usuario con ID: ${id} desde el servicio...`);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { correo: email } });
  }
}