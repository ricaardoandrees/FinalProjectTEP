import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

 async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<Usuario | null> {
    const fieldsToUpdate: { nombre?: string; contrasena?: string } = {};

    // Desestructurar updateProfileDto para mayor claridad y manejar undefined
    const { nombre, contrasena } = updateProfileDto;

    if (nombre !== undefined) { // Usamos !== undefined para incluir cadenas vacías si se desea actualizar a ""
      fieldsToUpdate.nombre = nombre;
    }
    if (contrasena !== undefined) {
      // ¡IMPORTANTE! Aquí debes hashear la contraseña ANTES de asignarla a fieldsToUpdate.contrasena
      // Ejemplo: fieldsToUpdate.contrasena = await bcrypt.hash(contrasena, 10);
      fieldsToUpdate.contrasena = contrasena; // Placeholder: Asegúrate de hashear esto en tu implementación real
    }

    // Si no hay campos para actualizar, lanzar BadRequestException
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new BadRequestException('No se proporcionaron datos válidos para actualizar el perfil.');
    }

    console.log('1 - updateProfileDto recibido:', updateProfileDto);
    console.log('2 - fieldsToUpdate construido:', fieldsToUpdate);
    console.log('3 - Ejecutando actualización con TypeORM update()');
    const updateResult = await this.usuarioRepository.update(userId, fieldsToUpdate);
    console.log('3 - Resultado de la actualización:', updateResult);

    // Verificar si el usuario fue realmente afectado por la actualización
    if (updateResult.affected === 0) {
      // Intentamos encontrar el usuario para determinar si no existía o si no hubo cambios.
      const usuarioExistente = await this.usuarioRepository.findOne({ where: { id: userId } });
      if (!usuarioExistente) {
        throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
      }
      // Si el usuario existe pero updateResult.affected es 0, significa que los valores proporcionados eran idénticos a los existentes.
      // En este caso, simplemente devolvemos el usuario existente.
      return usuarioExistente;
    }

    // Si se realizó la actualización, recuperamos la entidad actualizada para devolverla.
    // Esto es necesario porque .update() no devuelve la entidad actualizada, solo el resultado de la operación.
    return this.usuarioRepository.findOne({ where: { id: userId } });
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